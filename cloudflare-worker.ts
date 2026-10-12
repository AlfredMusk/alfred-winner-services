// @ts-ignore .open-next/worker.js est genere pendant le build OpenNext.
import { default as nextWorker } from "./.open-next/worker.js";

const DEFAULT_LOCALE = "fr";
const LOCALES = new Set(["fr", "en"]);
const NETLIFY_HOST = "alfred-winner-services.netlify.app";
const OFFICIAL_HOST = "www.alfredwinnerservices.com";
type WorkerExecutionContext = { waitUntil(promise: Promise<unknown>): void };

function isStaticOrInternal(pathname: string): boolean {
  return pathname.startsWith("/_next/") || pathname.startsWith("/api/") || pathname.includes(".");
}

function routeRequest(request: Request): Response | undefined {
  const url = new URL(request.url);

  if (url.hostname === NETLIFY_HOST) {
    url.protocol = "https:";
    url.hostname = OFFICIAL_HOST;
    url.port = "";
    return Response.redirect(url.toString(), 301);
  }

  if (request.method === "GET" && !isStaticOrInternal(url.pathname)) {
    const firstSegment = url.pathname.split("/").filter(Boolean)[0];
    if (!firstSegment || !LOCALES.has(firstSegment)) {
      url.pathname = `/${DEFAULT_LOCALE}${url.pathname === "/" ? "" : url.pathname}`;
      return Response.redirect(url.toString(), 307);
    }
  }
}

const worker = {
  async fetch(request: Request, env: unknown, ctx: WorkerExecutionContext) {
    return routeRequest(request) ?? nextWorker.fetch(request, env, ctx);
  },
};

export default worker;
