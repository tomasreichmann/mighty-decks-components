import { readFile } from "node:fs/promises";
import { compile } from "@mdx-js/mdx";

await compile(await readFile(new URL("./usage.mdx", import.meta.url), "utf8"), {
  outputFormat: "program",
});
