import { execFile } from "node:child_process";
import { access, cp, mkdir, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import { dirname, resolve } from "node:path";

import { sha256 } from "./artifact-lib.mjs";

const exec = promisify(execFile);
const packageRoot = resolve(import.meta.dirname, "..");
const output = resolve(packageRoot, "output");
const npmCli = resolve(dirname(process.execPath), "node_modules", "npm", "bin", "npm-cli.js");
const npmCliAvailable = await access(npmCli).then(() => true).catch(() => false);
const npm = (argumentsList) => npmCliAvailable
  ? exec(process.execPath, [npmCli, ...argumentsList], { cwd: packageRoot, maxBuffer: 1024 * 1024 })
  : exec(process.platform === "win32" ? "npm.cmd" : "npm", argumentsList, {
    cwd: packageRoot,
    maxBuffer: 1024 * 1024,
    shell: process.platform === "win32",
  });

await mkdir(output, { recursive: true });
const { stdout } = await npm(["pack", "--json", "--pack-destination", output]);
const [packed] = JSON.parse(stdout);
if (!packed?.filename || !packed?.integrity) {
  throw new Error("npm pack did not return tarball metadata.");
}
const archive = resolve(output, packed.filename);
const runtimeTarball = resolve(output, "runtime.tgz");
await cp(archive, runtimeTarball, { force: true });
const metadata = {
  ...packed,
  sourceArchive: packed.filename,
  runtimeTarball: "runtime.tgz",
  sha256: await sha256(runtimeTarball),
};
await writeFile(resolve(output, "runtime-pack.json"), `${JSON.stringify(metadata, null, 2)}\n`);
console.log(`Packed ${metadata.name}@${metadata.version} to output/runtime.tgz.`);
