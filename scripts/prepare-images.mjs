// Static responsive assets: no paid image service or per-request transformation.
// sharp is already installed with Next.js; originals remain untouched.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public/images");
const manifest = {};
async function visit(dir) {
  for (const entry of (await fs.readdir(dir, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { await visit(file); continue; }
    if (!/\.(jpe?g|png)$/i.test(file)) continue;
    const metadata = await sharp(file).metadata();
    if (!metadata.width) throw new Error(`Image width unavailable: ${file}`);
    const widths = [...new Set([64, 128, 256, 480, 768, 1200].map((w) => Math.min(w, metadata.width)))];
    const source = "/images/" + path.relative(root, file).split(path.sep).join("/");
    manifest[source] = [];
    for (const width of widths) {
      const target = file.replace(/\.(jpe?g|png)$/i, `-w${width}.webp`);
      await sharp(file).resize({ width, withoutEnlargement: true }).webp({ quality: source.includes("/brand/") ? 90 : 85 }).toFile(target);
      manifest[source].push({ width, src: "/images/" + path.relative(root, target).split(path.sep).join("/") });
    }
  }
}
await visit(root);
await fs.writeFile("src/lib/image-variants.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(`Responsive variants prepared for ${Object.keys(manifest).length} original images.`);
