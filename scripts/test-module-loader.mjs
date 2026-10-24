// Executes the real TypeScript sources with explicitly injected test dependencies.
// No production file is generated; no mail provider or Cloudflare account is contacted.
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(import.meta.url);

export function loadProjectModule(relativePath, mocks = {}) {
  const cache = new Map();
  function load(filename) {
    if (cache.has(filename)) return cache.get(filename).exports;
    const loadedModule = { exports: {} };
    cache.set(filename, loadedModule);
    const source = readFileSync(filename, "utf8");
    const compiled = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    }).outputText;
    const resolve = (specifier) => {
      if (Object.hasOwn(mocks, specifier)) return mocks[specifier];
      if (specifier === "server-only") return {};
      if (specifier.startsWith("@/") || specifier.startsWith(".")) {
        const target = specifier.startsWith("@/")
          ? path.join(root, "src", specifier.slice(2))
          : path.resolve(path.dirname(filename), specifier);
        const file = existsSync(target) ? target : `${target}.ts`;
        return load(file);
      }
      return require(specifier);
    };
    new Function("require", "module", "exports", compiled)(resolve, loadedModule, loadedModule.exports);
    return loadedModule.exports;
  }
  return load(path.join(root, relativePath));
}
