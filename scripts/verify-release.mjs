import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const packageRoot = resolve(import.meta.dirname, "..");
const argumentsByName = new Map();
const argumentsList = process.argv.slice(2).filter((argument) => argument !== "--");
for (let index = 0; index < argumentsList.length; index += 2) {
  argumentsByName.set(argumentsList[index], argumentsList[index + 1]);
}
const version = argumentsByName.get("--version");
const repository = argumentsByName.get("--repository");
if (!version || !repository || !/^[^/]+\/[^/]+$/.test(repository)) {
  throw new Error("Usage: node scripts/verify-release.mjs --version VERSION --repository OWNER/REPO");
}

const packageJson = JSON.parse(await readFile(resolve(packageRoot, "package.json"), "utf8"));
const releaseManifest = JSON.parse(await readFile(resolve(packageRoot, "output", "release-manifest.json"), "utf8"));
if (packageJson.version !== version || releaseManifest.packageVersion !== version) {
  throw new Error("Requested version does not match package and release-manifest versions.");
}
const expectedRepository = `git+https://github.com/${repository}.git`;
const registryResponse = await fetch(
  `https://registry.npmjs.org/${encodeURIComponent(packageJson.name)}/${encodeURIComponent(version)}`,
);
if (!registryResponse.ok) {
  throw new Error(`Registry package lookup failed: ${registryResponse.status} ${registryResponse.statusText}`);
}
const registry = await registryResponse.json();
const registryRepository = typeof registry.repository === "string"
  ? registry.repository
  : registry.repository?.url;
if (registryRepository !== expectedRepository) {
  throw new Error(`Registry repository mismatch: expected ${expectedRepository}, received ${String(registryRepository)}.`);
}
if (registry.dist?.integrity !== releaseManifest.runtime?.integrity) {
  throw new Error("Registry integrity does not match the validated runtime tarball.");
}
if (!registry.dist?.attestations) {
  throw new Error("Registry package has no provenance attestation metadata.");
}
console.log(JSON.stringify({
  package: `${packageJson.name}@${version}`,
  repository: registryRepository,
  integrity: registry.dist.integrity,
  attestations: registry.dist.attestations,
}, null, 2));
