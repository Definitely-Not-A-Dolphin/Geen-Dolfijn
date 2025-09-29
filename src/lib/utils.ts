import { Octokit } from "octokit";
import type { Commit, GitHubCommit, OctokitResponse } from "./customTypes.ts";
import { secretData } from "./secrets.ts";

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export async function getLatestCommits(repoID: number): Promise<Commit[]> {
  const octokit: Octokit = new Octokit({
    auth: secretData.token,
  });

  const commitData: OctokitResponse<GitHubCommit[]> = await octokit.request(
    "GET /repositories/{repoID}/commits",
    {
      repoID: repoID,
    },
  );

  const returnData: Commit[] = [];

  for (let i = 0; i <= 2; i++) {
    const thing = commitData.data[i];
    returnData.push({
      message: thing.commit.message,
      author: thing.author.login,
      html_url: thing.html_url,
      author_html_url: thing.author.html_url,
      author_avatar_url: thing.author.avatar_url,
    });
  }

  return returnData;
}
