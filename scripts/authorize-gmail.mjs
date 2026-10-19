// One-time local provisioning. Never prints OAuth credentials, codes or tokens.
import { createServer } from "node:http";
import { randomBytes, createHash, timingSafeEqual } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const directory = resolve(".wrangler/gmail-setup");
const { web: client } = JSON.parse(await readFile(resolve(directory, "client.json"), "utf8"));
const redirectUri = "http://localhost:8765/oauth2/callback";
const scope = "https://www.googleapis.com/auth/gmail.send";
if (!client?.client_id || !client?.client_secret || !client.redirect_uris?.includes(redirectUri)) {
  throw Error("OAuth client configuration is incomplete");
}
const state = randomBytes(32).toString("base64url");
const verifier = randomBytes(48).toString("base64url");
const authorization = new URL("https://accounts.google.com/o/oauth2/v2/auth");
authorization.search = new URLSearchParams({
  client_id: client.client_id, redirect_uri: redirectUri, response_type: "code",
  scope, access_type: "offline", prompt: "consent", login_hint: "krodi2001@gmail.com",
  state, code_challenge: createHash("sha256").update(verifier).digest("base64url"), code_challenge_method: "S256",
}).toString();
await mkdir(directory, { recursive: true, mode: 0o700 });
await writeFile(resolve(directory, "authorization-url.txt"), authorization.toString(), { mode: 0o600 });
let processing = false;
const server = createServer(async (request, response) => {
  const send = (status, text) => {
    response.writeHead(status, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "Referrer-Policy": "no-referrer", "Content-Security-Policy": "default-src 'none'", "X-Content-Type-Options": "nosniff" });
    response.end(text);
  };
  if (request.method !== "GET" || !["localhost:8765", "127.0.0.1:8765"].includes(request.headers.host)) return send(400, "Requête refusée.");
  const url = new URL(request.url, redirectUri);
  if (url.pathname !== "/oauth2/callback") return send(404, "Page introuvable.");
  const receivedState = url.searchParams.get("state") ?? "";
  if (receivedState.length !== state.length || !timingSafeEqual(Buffer.from(receivedState), Buffer.from(state))) return send(403, "Session OAuth non reconnue.");
  if (processing) return send(409, "Autorisation déjà traitée.");
  processing = true;
  if (url.searchParams.has("error") || !url.searchParams.get("code")) {
    send(400, "Autorisation non accordée. Aucun secret enregistré.");
    console.log("OAUTH_NOT_AUTHORIZED");
    return server.close();
  }
  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ client_id: client.client_id, client_secret: client.client_secret,
        code: url.searchParams.get("code"), redirect_uri: redirectUri, grant_type: "authorization_code", code_verifier: verifier }),
      redirect: "error", signal: AbortSignal.timeout(15_000),
    });
    if (!tokenResponse.ok) throw Error("OAUTH_EXCHANGE_REJECTED");
    const token = await tokenResponse.json();
    if (!token.refresh_token || !token.access_token || (token.scope && token.scope.split(" ").some((value) => value !== scope))) throw Error("OAUTH_SCOPE_OR_TOKEN_INVALID");
    await writeFile(resolve(directory, "secrets.json"), JSON.stringify({ GMAIL_CLIENT_ID: client.client_id, GMAIL_CLIENT_SECRET: client.client_secret, GMAIL_REFRESH_TOKEN: token.refresh_token }), { mode: 0o600 });
    send(200, "Autorisation Gmail reçue et enregistrée localement de façon privée. Vous pouvez revenir dans Codex.");
    console.log("OAUTH_READY — secret values not displayed");
  } catch {
    send(502, "Configuration OAuth non finalisée. Aucun succès d’envoi annoncé.");
    console.log("OAUTH_CONFIGURATION_FAILED — no sensitive error output");
  } finally { server.close(); }
});
const timeout = setTimeout(() => { console.log("OAUTH_SESSION_EXPIRED"); server.close(); }, 20 * 60_000);
server.on("close", () => clearTimeout(timeout));
server.listen(8765, "127.0.0.1", () => console.log("OAUTH_LOCAL_CALLBACK_READY — localhost:8765; authorization URL saved privately"));
