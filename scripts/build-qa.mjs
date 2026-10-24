// Public metadata only; no production credentials are needed for a QA build.
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const result = spawnSync(process.execPath, [require.resolve("next/dist/bin/next"), "build"], {
  stdio: "inherit",
  env: { ...process.env, AWS_SITE_URL: "https://www.alfredwinnerservices.com", AWS_DEPLOYMENT_ENV: "production", AWS_INDEXING_ENABLED: "true" },
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
