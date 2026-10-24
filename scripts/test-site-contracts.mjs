import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync, readFileSync } from "node:fs";
import { loadProjectModule } from "./test-module-loader.mjs";

const { getDictionary } = loadProjectModule("src/i18n/dictionaries.ts");
const root = new URL("../", import.meta.url);
function leaves(value, prefix = "") {
  if (typeof value === "string") return [[prefix, value]];
  if (!value || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([key, val]) => leaves(val, `${prefix}.${key}`));
}
test("FR and EN have the same dictionary shape and six real project entries", () => {
  const fr = getDictionary("fr"), en = getDictionary("en");
  assert.deepEqual(leaves(fr).map(([key]) => key), leaves(en).map(([key]) => key));
  for (const dict of [fr, en]) {
    assert.equal(dict.projets.liste.length, 6);
    assert.equal(new Set(dict.projets.liste.map((p) => p.id)).size, 6);
    for (const [, value] of leaves(dict)) assert.ok(value.trim().length > 0);
  }
});
test("Every localized image and every optimized variant is a tracked deployable asset", async () => {
  const { execFileSync } = await import("node:child_process");
  const tracked = new Set(execFileSync("git", ["ls-files"], { cwd: root, encoding: "utf8" }).split("\n"));
  const variants = JSON.parse(readFileSync(new URL("src/lib/image-variants.json", root), "utf8"));
  for (const locale of ["fr", "en"]) for (const [, value] of leaves(getDictionary(locale))) {
    if (!value.startsWith("/images/")) continue;
    assert.ok(existsSync(new URL(`public${value}`, root)), value);
    assert.ok(tracked.has(`public${value}`), `Not tracked: ${value}`);
  }
  for (const entries of Object.values(variants)) for (const { src } of entries) {
    assert.ok(existsSync(new URL(`public${src}`, root)), src);
    assert.ok(tracked.has(`public${src}`), `Not tracked: ${src}`);
  }
});
test("Official contact links agree across locales", () => {
  for (const locale of ["fr", "en"]) {
    const dict = getDictionary(locale);
    assert.equal(dict.contact.telephoneHref, "tel:+2250748191100");
    assert.equal(dict.contact.emailMailtoHref, "mailto:contact@alfredwinnerservices.com");
    assert.equal(dict.whatsapp.href, "https://wa.me/2250748191100");
    assert.match(dict.footer.reseaux.facebook, /^https:\/\/www\.facebook\.com\//);
    assert.match(dict.footer.reseaux.linkedin, /^https:\/\/www\.linkedin\.com\//);
    assert.ok(!("instagram" in dict.footer.reseaux));
  }
});
