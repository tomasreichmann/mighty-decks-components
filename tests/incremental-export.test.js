import assert from "node:assert/strict";
import test from "node:test";
const { planExport } = await import("../scripts/export-plan.mjs");
const entries = [
    { path: "png/en/outcome/success/full/1024.png", fingerprint: "success" },
    { path: "png/en/effect/burning/full/1024.png", fingerprint: "burning" },
];
test("does not render when every PNG fingerprint is unchanged", () => {
    const plan = planExport(entries, { entries });
    assert.deepEqual(plan.render, []);
    assert.deepEqual(plan.remove, []);
});
test("renders only the PNG variants whose card fingerprint changed", () => {
    const plan = planExport(entries, { entries: [{ ...entries[0], fingerprint: "old-success" }, entries[1]] });
    assert.deepEqual(plan.render, [entries[0].path]);
});
test("invalidates every PNG when a shared renderer fingerprint changes", () => {
    const plan = planExport(entries.map((entry) => ({ ...entry, fingerprint: `shared-style:${entry.fingerprint}` })), { entries });
    assert.deepEqual(plan.render, entries.map((entry) => entry.path));
});
test("removes PNGs retired from the current catalogue", () => {
    const plan = planExport([entries[0]], { entries });
    assert.deepEqual(plan.remove, [entries[1].path]);
});
test("does not mutate the prior manifest while a render plan is in progress", () => {
    const prior = { entries: [...entries] };
    planExport([{ ...entries[0], fingerprint: "changed" }, entries[1]], prior);
    assert.deepEqual(prior, { entries });
});
