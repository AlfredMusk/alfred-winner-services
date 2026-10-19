import "server-only";
import { Buffer } from "node:buffer";

type GmailMessage = {
  sender: string;
  replyTo: string;
  subject: string;
  text: string;
};

export function gmailApiConfigured(): boolean {
  return [process.env.GMAIL_CLIENT_ID, process.env.GMAIL_CLIENT_SECRET, process.env.GMAIL_REFRESH_TOKEN]
    .every((value) => Boolean(value?.trim()));
}

class GmailApiError extends Error {
  constructor(public readonly code: string) {
    super("Gmail delivery failed");
  }
}

/** HTTPS only. OAuth scope: gmail.send; no mailbox reading or deletion. */
export async function sendGmailApiMessage(message: GmailMessage): Promise<void> {
  if (!gmailApiConfigured()) throw new GmailApiError("GMAIL_CONFIGURATION");
  // These fields become MIME headers. Never allow additional injected headers.
  if ([message.sender, message.replyTo, message.subject].some((value) => /[\r\n]/.test(value))) {
    throw new GmailApiError("GMAIL_INVALID_HEADER");
  }
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GMAIL_CLIENT_ID!.trim(),
      client_secret: process.env.GMAIL_CLIENT_SECRET!.trim(),
      refresh_token: process.env.GMAIL_REFRESH_TOKEN!.trim(),
      grant_type: "refresh_token",
    }),
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(10_000),
  });
  if (!tokenResponse.ok) throw new GmailApiError("GMAIL_TOKEN_REJECTED");
  const token: unknown = await tokenResponse.json();
  if (!token || typeof token !== "object" || !("access_token" in token)
    || typeof token.access_token !== "string" || !token.access_token) {
    throw new GmailApiError("GMAIL_TOKEN_INVALID");
  }
  // Fold RFC 2047 words without splitting a Unicode code point.
  const subjectParts: string[] = [];
  let subjectPart = "";
  for (const character of message.subject) {
    if (Buffer.byteLength(subjectPart + character, "utf8") > 42) {
      subjectParts.push(subjectPart);
      subjectPart = "";
    }
    subjectPart += character;
  }
  subjectParts.push(subjectPart);
  const subject = subjectParts.map((part) => `=?UTF-8?B?${Buffer.from(part, "utf8").toString("base64")}?=`).join("\r\n ");
  const body = Buffer.from(message.text, "utf8").toString("base64").match(/.{1,76}/g)?.join("\r\n") ?? "";
  const mime = [
    `From: Alfred Winner Services <${message.sender}>`,
    `To: ${message.sender}`,
    `Reply-To: ${message.replyTo}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    body,
    "",
  ].join("\r\n");
  const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${token.access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ raw: Buffer.from(mime, "utf8").toString("base64url") }),
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new GmailApiError("GMAIL_SEND_REJECTED");
  const result: unknown = await response.json();
  if (!result || typeof result !== "object" || !("id" in result) || typeof result.id !== "string" || !result.id) {
    throw new GmailApiError("GMAIL_SEND_UNCONFIRMED");
  }
  // A Gmail message ID confirms API acceptance, not receipt in the destination inbox.
}
