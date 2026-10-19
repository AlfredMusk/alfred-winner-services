import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Corporate pages are built ahead of time; no ISR or paid storage is needed.
// OpenNext serves their cached HTML/RSC without rendering NextServer again.
// Dynamic route handlers, including contact, keep their server execution.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
