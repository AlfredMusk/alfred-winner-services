import assert from "node:assert/strict";
import { test } from "node:test";
import { loadProjectModule } from "./test-module-loader.mjs";

const origin = "https://www.alfredwinnerservices.com";
const valid = { nom: "Visiteur de test", email: "visitor@example.com", telephone: "+2250102030405", entreprise: "Test", service: "Software & IA", typeProjet: "Site", description: "Demande de démonstration de validation", chargeA: 1 };

async function isolated(run, options = {}) {
  const env = { CONTACT_ALLOWED_ORIGINS: origin, CONTACT_EMAIL_TRANSPORT: "gmail-api", GMAIL_APP_PASSWORD: "" };
  const previous = Object.fromEntries(Object.keys(env).map((key) => [key, process.env[key]]));
  Object.assign(process.env, env);
  const calls = [];
  let closed = 0;
  const routeModule = loadProjectModule("src/app/api/contact/route.ts", {
    "@/lib/gmail-api.server": {
      gmailApiConfigured: () => options.configured !== false,
      sendGmailApiMessage: async (message) => {
        calls.push(message);
        if (options.failure) throw Object.assign(new Error("PRIVATE_PROVIDER_RESPONSE"), { code: "GMAIL_SEND_REJECTED" });
      },
    },
    nodemailer: { createTransport: () => ({
      sendMail: async (message) => { calls.push(message); return { accepted: options.smtpAccepted ? ["krodi2001@gmail.com"] : [] }; },
      close: () => { closed++; },
    }) },
  });
  const post = async (body = valid, headers = {}) => routeModule.POST(new Request(`${origin}/api/contact`, {
    method: "POST", headers: { origin, "content-type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  }));
  const originalError = console.error;
  const logs = [];
  console.error = (...args) => logs.push(args.join(" "));
  try { await run({ post, calls, logs, closed: () => closed }); }
  finally {
    console.error = originalError;
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
}

test("Contact rejects missing/untrusted origins and wrong content type without delivery", () => isolated(async ({ post, calls }) => {
  for (const value of ["", "null", "https://www.alfredwinnerservices.com.evil.example", "https://evil.example"]) {
    assert.equal((await post(valid, { origin: value })).status, 403);
  }
  assert.equal((await post(valid, { "content-type": "text/plain" })).status, 415);
  assert.equal(calls.length, 0);
}));
test("Contact rejects malformed JSON, null, arrays and invalid/oversized fields", () => isolated(async ({ post, calls }) => {
  for (const payload of ["{", "null", "[]", { ...valid, nom: "" }, { ...valid, email: "not-an-email" }, { ...valid, service: "invented" }, { ...valid, description: "" }, { ...valid, nom: "x".repeat(201) }, { ...valid, email: "x@example.com\r\nBcc: other@example.com" }]) {
    assert.equal((await post(payload)).status, 400);
  }
  assert.equal((await post({ ...valid, description: "x".repeat(33000) }, { "content-length": "0" })).status, 413);
  assert.equal(calls.length, 0);
}));
test("Contact rejects mailbox delimiters rather than interpreting an address list", () => isolated(async ({ post, calls }) => {
  for (const email of ["<visitor@example.com>", "visitor@example.com,other.test", "visitor@example.com;other.test", "visitor(comment)@example.com"]) {
    assert.equal((await post({ ...valid, email })).status, 400, email);
  }
  assert.equal(calls.length, 0);
}));
test("Contact rejects honeypot and too-fast submissions", () => isolated(async ({ post, calls }) => {
  assert.equal((await post({ ...valid, site: "spam" })).status, 400);
  assert.equal((await post({ ...valid, chargeA: Date.now() })).status, 429);
  assert.equal(calls.length, 0);
}));
test("Every FR/EN service reaches the actual route; seven fields and Reply-To preserved", () => isolated(async ({ post, calls }) => {
  const { getDictionary } = loadProjectModule("src/i18n/dictionaries.ts");
  let i = 0;
  for (const locale of ["fr", "en"]) for (const service of getDictionary(locale).contact.formulaire.serviceOptions) {
    const data = { ...valid, email: `visitor+${i++}@example.com`, service };
    const response = await post(data);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { livraison: "envoye" });
    const message = calls.at(-1);
    assert.equal(message.replyTo, data.email);
    assert.equal(message.sender, "krodi2001@gmail.com");
    for (const value of [data.nom, data.email, data.telephone, data.entreprise, service, data.typeProjet, data.description]) assert.ok(message.text.includes(value));
  }
}));
test("Contact rate limit stops the fourth attempt for the same mailbox", () => isolated(async ({ post, calls }) => {
  for (let i = 0; i < 3; i++) assert.equal((await post()).status, 200);
  assert.equal((await post()).status, 429);
  assert.equal(calls.length, 3);
}));
test("Missing Gmail configuration fails closed, never returning success", () => isolated(async ({ post, calls }) => {
  assert.equal((await post()).status, 503);
  assert.equal(calls.length, 0);
}, { configured: false }));
test("Provider rejection returns generic 502 and logs no visitor/provider content", () => isolated(async ({ post, calls, logs }) => {
  const response = await post();
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { erreurGenerique: true });
  assert.equal(calls.length, 1);
  assert.ok(!logs.join().includes(valid.email));
  assert.ok(!logs.join().includes("PRIVATE_PROVIDER_RESPONSE"));
}, { failure: true }));
test("SMTP fallback rejects an unaccepted recipient and closes transport", () => isolated(async ({ post, closed }) => {
  process.env.CONTACT_EMAIL_TRANSPORT = "smtp";
  process.env.GMAIL_APP_PASSWORD = "TEST_ONLY_NOT_A_CREDENTIAL";
  assert.equal((await post()).status, 502);
  assert.equal(closed(), 1);
}));
