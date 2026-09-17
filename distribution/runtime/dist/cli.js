#!/usr/bin/env node
import { mkdir as i, cp as s, rm as u } from "node:fs/promises";
import { resolve as e } from "node:path";
const d = async () => {
  const [, , r, n, a] = process.argv;
  if (r === "copy-static" && n === "--out" && a) {
    const o = e(import.meta.dirname, ".."), t = e(a, "mighty-decks");
    await i(t, { recursive: !0 });
    for (const c of ["docs", "skills"])
      await s(e(o, c), e(t, c), { recursive: !0, force: !0 });
    await s(e(o, "assets", "fonts"), e(t, "assets", "fonts"), { recursive: !0, force: !0 }), await s(
      e(o, "generated", "csv"),
      e(t, "generated", "csv"),
      { recursive: !0, force: !0 }
    ), await i(e(t, "generated"), { recursive: !0 }), await s(
      e(o, "generated", "manifest.json"),
      e(t, "generated", "manifest.json"),
      { force: !0 }
    ), await u(e(t, "generated", "png"), { recursive: !0, force: !0 });
  } else
    console.error("Usage: mighty-decks-components copy-static --out <directory>"), process.exitCode = 1;
};
d().catch((r) => {
  console.error(r instanceof Error ? r.message : r), process.exitCode = 1;
});
