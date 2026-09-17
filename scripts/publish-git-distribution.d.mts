export interface GitDistributionPublication {
  sha: string;
  tag: string;
  created: boolean;
}

export function publishGitDistribution(options: {
  remote: string;
  stagedDirectory: string;
  version: string;
  branch?: string;
}): Promise<GitDistributionPublication>;
