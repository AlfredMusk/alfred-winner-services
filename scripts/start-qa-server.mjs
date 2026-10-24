// Isolated HTTPS test harness, never used by Cloudflare or npm start.
// Ephemeral self-signed certificate stays outside the repository.
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { createServer } from "node:https";
import next from "next";

const directory = mkdtempSync(join(tmpdir(), "aws-qa-tls-"));
const key = join(directory, "key.pem");
const cert = join(directory, "cert.pem");
execFileSync("openssl", ["req", "-x509", "-newkey", "rsa:2048", "-nodes", "-keyout", key, "-out", cert, "-days", "1", "-subj", "/CN=localhost"], { stdio: "ignore" });
const credentials = { key: readFileSync(key), cert: readFileSync(cert) };
rmSync(directory, { recursive: true, force: true });
const app = next({ dev: false, hostname: "127.0.0.1", port: 3100 });
await app.prepare();
const server = createServer(credentials, app.getRequestHandler());
server.listen(3100, "127.0.0.1", () => console.log("QA HTTPS: https://127.0.0.1:3100"));
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => {
  server.close();
  void app.close().finally(() => process.exit(0));
});
