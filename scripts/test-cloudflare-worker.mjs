import assert from "node:assert/strict";
import { test } from "node:test";
import { loadProjectModule } from "./test-module-loader.mjs";

function setup() {
  let handled = 0;
  const { default: worker } = loadProjectModule("cloudflare-worker.ts", {
    "./.open-next/worker.js": { fetch: async () => { handled++; return new Response("application"); } },
  });
  return { fetch: (url, env = {}, method = "GET") => worker.fetch(new Request(url, { method }), env, { waitUntil() {} }), handled: () => handled };
}
test("Host redirects are permanent and preserve paths and query strings", async () => {
  const { fetch, handled } = setup();
  for (const host of ["alfred-winner-services.netlify.app", "alfredwinnerservices.com"]) {
    for (const path of ["/", "/fr", "/en", "/fr/mentions-legales", "/en?x=1&y=two"]) {
      const response = await fetch(`https://${host}${path}`);
      assert.equal(response.status, 301);
      assert.equal(response.headers.get("location"), `https://www.alfredwinnerservices.com${path}`);
    }
  }
  assert.equal(handled(), 0);
});
test("Official locale URLs and static assets never redirect to themselves", async () => {
  const { fetch } = setup();
  for (const path of ["/fr", "/en", "/fr/confidentialite", "/robots.txt", "/sitemap.xml", "/_next/static/test.js", "/images/logo.webp"]) {
    const response = await fetch(`https://www.alfredwinnerservices.com${path}`);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("location"), null);
  }
});
test("Root uses the default locale; preview responses remain non-indexable", async () => {
  const { fetch } = setup();
  const root = await fetch("https://www.alfredwinnerservices.com/?x=1");
  assert.equal(root.status, 307);
  assert.equal(root.headers.get("location"), "https://www.alfredwinnerservices.com/fr?x=1");
  const preview = await fetch("https://qa.example.workers.dev/fr");
  assert.equal(preview.headers.get("x-robots-tag"), "noindex, nofollow");
});
test("Contact fails closed without its distributed rate limiter", async () => {
  const { fetch, handled } = setup();
  assert.equal((await fetch("https://www.alfredwinnerservices.com/api/contact", {}, "POST")).status, 503);
  assert.equal(handled(), 0);
});
test("Cloudflare rate limit blocks before application processing", async () => {
  const { fetch, handled } = setup();
  const env = { CONTACT_RATE_LIMITER: { limit: async () => ({ success: false }) } };
  const response = await fetch("https://www.alfredwinnerservices.com/api/contact", env, "POST");
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "60");
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(handled(), 0);
  env.CONTACT_RATE_LIMITER.limit = async () => ({ success: true });
  assert.equal((await fetch("https://www.alfredwinnerservices.com/api/contact", env, "POST")).status, 200);
  assert.equal(handled(), 1);
});
