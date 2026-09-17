export const planExport = (entries, previous) => {
  const prior = new Map((previous.entries ?? []).map((entry) => [entry.path, entry]));
  const current = new Set(entries.map((entry) => entry.path));
  return {
    render: entries.filter((entry) => prior.get(entry.path)?.fingerprint !== entry.fingerprint).map((entry) => entry.path),
    remove: [...prior.keys()].filter((path) => !current.has(path)).sort(),
  };
};
