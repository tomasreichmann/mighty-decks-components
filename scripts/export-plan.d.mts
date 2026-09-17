export type ExportPlanEntry = { path: string; fingerprint: string };

export const planExport: (
  entries: ExportPlanEntry[],
  previous: { entries?: Array<Pick<ExportPlanEntry, "path"> & Partial<ExportPlanEntry>> },
) => { render: string[]; remove: string[] };
