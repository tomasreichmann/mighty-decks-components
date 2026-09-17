import { createHash } from "node:crypto";
import { Buffer } from "node:buffer";
import { execFile } from "node:child_process";
import { resolve } from "node:path";
import { promisify } from "node:util";

const exec = promisify(execFile);
const args = process.argv.slice(2).filter((argument) => argument !== "--");
const value = (name) => args[args.indexOf(name) + 1];
const version = value("--version");
const repository = value("--repository");
if (!version || !repository || !/^[^/]+\/[^/]+$/.test(repository)) throw new Error("Usage: node scripts/verify-release.mjs --version VERSION --repository OWNER/REPO");
const getJson = async (url) => {
  const response = await fetch(url, { headers: { Accept: "application/vnd.github+json", ...(process.env.GH_TOKEN ? { Authorization: `Bearer ${process.env.GH_TOKEN}` } : {}) } });
  if (!response.ok) throw new Error(`GitHub request failed: ${response.status} ${response.statusText}`);
  return response.json();
};
const tagCommit = async (repository, tag) => {
  const ref = await getJson(`https://api.github.com/repos/${repository}/git/ref/tags/${encodeURIComponent(tag)}`);
  const tagObject = ref.object.type === "tag" ? await getJson(ref.object.url) : ref.object;
  return tagObject.object?.sha ?? tagObject.sha;
};
const assetSha256 = async (asset) => {
  const response = await fetch(asset.url, { headers: { Accept: "application/octet-stream", ...(process.env.GH_TOKEN ? { Authorization: `Bearer ${process.env.GH_TOKEN}` } : {}) } });
  if (!response.ok) throw new Error(`Could not download ${asset.name}.`);
  return createHash("sha256").update(Buffer.from(await response.arrayBuffer())).digest("hex");
};
const release = await getJson(`https://api.github.com/repos/${repository}/releases/tags/v${version}`);
const manifestAsset = release.assets?.find((asset) => asset.name === "release-manifest.json");
if (!manifestAsset) throw new Error("GitHub release is missing release-manifest.json.");
const manifestResponse = await fetch(manifestAsset.url, { headers: { Accept: "application/octet-stream", ...(process.env.GH_TOKEN ? { Authorization: `Bearer ${process.env.GH_TOKEN}` } : {}) } });
if (!manifestResponse.ok) throw new Error("Could not download release manifest.");
const manifest = await manifestResponse.json();
if (manifest.packageVersion !== version) throw new Error("Release manifest package version mismatch.");
if (!/^[a-f0-9]{40}$/i.test(manifest.sourceCommit ?? "")) throw new Error("Release manifest is missing a full source commit SHA.");
if (await tagCommit(repository, `v${version}`) !== manifest.sourceCommit) throw new Error("Source tag does not point to the manifest source commit.");
if (!manifest.gitDistribution) throw new Error("Release manifest is missing Git distribution provenance.");
const { repository: distributionRepository, commit, tag } = manifest.gitDistribution;
if (distributionRepository !== `https://github.com/${repository}.git` || tag !== `dist-v${version}` || !/^[a-f0-9]{40}$/i.test(commit)) throw new Error("Release manifest has invalid Git distribution provenance.");
const taggedCommit = await tagCommit(repository, tag);
if (taggedCommit !== commit) throw new Error("Distribution tag does not point to the manifest commit.");
for (const artifact of [manifest.runtime, manifest.runtimeAssets, ...(manifest.archives ?? [])]) {
  if (!artifact?.filename || !/^[a-f0-9]{64}$/i.test(artifact.sha256 ?? "")) throw new Error("Release manifest has invalid artifact digest metadata.");
  const asset = release.assets.find((candidate) => candidate.name === artifact.filename);
  if (!asset) throw new Error(`GitHub release is missing ${artifact.filename}.`);
  if (await assetSha256(asset) !== artifact.sha256) throw new Error(`GitHub release asset digest mismatch: ${artifact.filename}.`);
}
await exec(process.execPath, [
  resolve(import.meta.dirname, "verify-consumer.mjs"),
  "--git",
  `git+${distributionRepository}#${commit}`,
  "--expected-distribution",
  JSON.stringify({
    schemaVersion: 1,
    packageName: manifest.packageName,
    packageVersion: manifest.packageVersion,
    contentVersion: manifest.contentVersion,
    sourceCommit: manifest.sourceCommit,
    runtimeTarballSha256: manifest.runtime.sha256,
  }),
], { cwd: resolve(import.meta.dirname, ".."), env: process.env, maxBuffer: 1024 * 1024 });
console.log(JSON.stringify({ package: `${manifest.packageName}@${version}`, distribution: `${tag}@${commit}`, assets: release.assets.length }, null, 2));
