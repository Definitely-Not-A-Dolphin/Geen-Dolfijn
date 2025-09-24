import { json } from "@sveltejs/kit";
import type {
  GitHubRepository,
  Language,
  OctokitResponse,
} from "$lib/customTypes.ts";
import { Octokit } from "octokit";
import secretData from "$lib/secretData.json" with { type: "json" };

export async function GET({ url }: any): Promise<Response> {
  const repoID = url.searchParams.get("repoID");
  if (!repoID) return json(false);

  const octokit: Octokit = new Octokit({
    auth: secretData.token,
  });

  // Request the repo with matching IDs
  const receivedRepoData: OctokitResponse<GitHubRepository> = await octokit
    .request(
      "GET /repositories/{repoID}",
      {
        repoID: repoID,
      },
    );

  console.log(
    `\x1b[44m > \x1b[0m Fetch Log: ${receivedRepoData.data.full_name}`,
  );
  console.log(receivedRepoData.headers);

  // Get the languages
  const rawLanguageData: OctokitResponse<Language[]> = await octokit
    .request("GET /{url}", {
      url: receivedRepoData.data.languages_url,
    });

  console.log(
    `\x1b[43m > \x1b[0m Fetch Log Languages: ${receivedRepoData.data.full_name}`,
  );
  console.log(rawLanguageData.headers);

  // Aantal characters
  let totalChar: number = 0;
  for (const language of Object.entries(rawLanguageData.data)) {
    totalChar += Number(language[1]);
  }

  let languageData: { [language: string]: number } = {};
  for (const language of Object.entries(rawLanguageData.data)) {
    const thing: number = Math.floor(Number(language[1]) / totalChar * 1000) /
      10;
    if (thing === 0) {
      continue; // Equivalent of break as long as github doesn't switch the descending order of languages
    }
    languageData[language[0]] = thing;
  }

  const returnData = {
    id: receivedRepoData.data.id,
    fullName: receivedRepoData.data.full_name,
    name: receivedRepoData.data.name,
    owner: {
      login: receivedRepoData.data.owner.login,
      avatarUrl: receivedRepoData.data.owner.avatar_url,
    },
    description: receivedRepoData.data.description,
    url: receivedRepoData.data.html_url,
    languages: languageData,
    license: receivedRepoData.data.license
      ? {
        name: receivedRepoData.data.license.name,
        url: receivedRepoData.data.license.url,
      }
      : undefined,
    stargazerCount: receivedRepoData.data.stargazers_count,
  };

  console.log(
    `\x1b[102m > \x1b[0m Returned Data: ${receivedRepoData.data.full_name}`,
  );
  console.log(returnData);

  return json(returnData);
}
