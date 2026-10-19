import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import ts from "typescript";

// Compile the pure server helper for Node tests. Next's server-only boundary is checked by build.
const source = (await readFile(new URL("../src/lib/gmail-api.server.ts", import.meta.url), "utf8"))
  .replace('import "server-only";', "");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { sendGmailApiMessage, gmailApiConfigured } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
const names = ["GMAIL_CLIENT_ID", "GMAIL_CLIENT_SECRET", "GMAIL_REFRESH_TOKEN"];
const message = {
  sender: "owner@example.com", replyTo: "visitor@example.com",
  subject: "Nouveau projet AWS — Intelligence artificielle et développement logiciel",
  text: "Nom & prénom : Visiteur\nEmail : visitor@example.com\nTéléphone : 123\nEntreprise : Test\nService : IA\nType : Web\nDescription : Test de livraison",
};
async function isolated(run) {
  const previous = names.map((name) => process.env[name]);
  const originalFetch = globalThis.fetch;
  names.forEach((name) => { process.env[name] = "TEST_ONLY_NOT_A_CREDENTIAL"; });
  try { await run(); } finally {
    globalThis.fetch = originalFetch;
    names.forEach((name, i) => { if (previous[i] === undefined) delete process.env[name]; else process.env[name] = previous[i]; });
  }
}
test("Gmail HTTPS accepts only a confirmed message and preserves Unicode, body and Reply-To", () => isolated(async () => {
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return Response.json(calls.length === 1 ? { access_token: "TEST_ONLY_ACCESS_TOKEN" } : { id: "test-message-id" });
  };
  await sendGmailApiMessage(message);
  assert.equal(calls.length, 2);
  assert.equal(calls[0].url, "https://oauth2.googleapis.com/token");
  assert.equal(calls[0].options.body.get("grant_type"), "refresh_token");
  assert.equal(calls[1].url, "https://gmail.googleapis.com/gmail/v1/users/me/messages/send");
  assert.equal(calls[1].options.redirect, "error");
  assert.equal(calls[1].options.cache, "no-store");
  const mime = Buffer.from(JSON.parse(calls[1].options.body).raw, "base64url").toString("utf8");
  assert.ok(mime.includes("Reply-To: visitor@example.com\r\n"));
  assert.ok(mime.includes("To: owner@example.com\r\n"));
  const [headers, body] = mime.split("\r\n\r\n");
  const subject = [...headers.matchAll(/=\?UTF-8\?B\?([^?]+)\?=/g)].map((m) => Buffer.from(m[1], "base64").toString("utf8")).join("");
  assert.equal(subject, message.subject);
  assert.equal(Buffer.from(body.replace(/\s/g, ""), "base64").toString("utf8"), message.text);
  assert.ok(headers.split("\r\n").every((line) => line.length <= 78));
  assert.ok(!mime.includes("TEST_ONLY"));
}));
test("Missing configuration and header injection fail before any network request", () => isolated(async () => {
  globalThis.fetch = async () => { throw Error("Network must not be called"); };
  delete process.env.GMAIL_REFRESH_TOKEN;
  assert.equal(gmailApiConfigured(), false);
  await assert.rejects(sendGmailApiMessage(message), { code: "GMAIL_CONFIGURATION" });
  process.env.GMAIL_REFRESH_TOKEN = "TEST_ONLY";
  await assert.rejects(sendGmailApiMessage({ ...message, replyTo: "visitor@example.com\r\nBcc: other@example.com" }), { code: "GMAIL_INVALID_HEADER" });
}));
for (const [name, responses, expected] of [
  ["OAuth rejection", [new Response("Private provider error", { status: 401 })], "GMAIL_TOKEN_REJECTED"],
  ["Missing access token", [Response.json({})], "GMAIL_TOKEN_INVALID"],
  ["Send rejection", [Response.json({ access_token: "TEST_ONLY" }), new Response("Private provider error", { status: 403 })], "GMAIL_SEND_REJECTED"],
  ["Missing confirmation ID", [Response.json({ access_token: "TEST_ONLY" }), Response.json({})], "GMAIL_SEND_UNCONFIRMED"],
]) {
  test(`${name} never reports success or exposes the provider response`, () => isolated(async () => {
    globalThis.fetch = async () => responses.shift();
    await assert.rejects(sendGmailApiMessage(message), (error) => {
      assert.equal(error.code, expected);
      assert.equal(error.message, "Gmail delivery failed");
      return true;
    });
  }));
}
