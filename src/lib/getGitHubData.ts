import { Octokit } from "octokit";
import type {
  Repository,
  GitHubRepository,
  OctokitData,
} from "./customTypes.ts";
import secretData from "./secretData.json" with { type: "json" };

export async function getData(idArray: number[]): Promise<Repository[]> {
  const octokit = new Octokit({
    auth: secretData.token,
  });

  const repoData: OctokitData = await octokit.request(
    "GET /users/{owner}/repos",
    {
      owner: "definitely-not-a-dolphin",
    },
  );

  console.log(`\x1b[44m > \x1b[0m Fetch Log`);
  console.log(repoData.headers);

  let desiredRepoData = [];
  let returnData: Repository[] = [];

  for (const repository of Object.entries(repoData.data)) {
    if (idArray.includes(repository[1].id)) {
      desiredRepoData.push(repository);
    }
  }

  for (const repositoryEntry of desiredRepoData) {
    const rawLanguageData = await octokit.request("GET /{url}", {
      url: repositoryEntry[1].languages_url,
    });

    console.log(`\x1b[43m > \x1b[0m Fetch Log Languages`);
    console.log(rawLanguageData.headers);

    let languageData: { [language: string]: string } = {};

    // Aantal characters
    let langTotalChar: number = 0;

    for (const language of Object.entries(rawLanguageData.data)) {
      langTotalChar += Number(language[1]);
    }
    for (const language of Object.entries(rawLanguageData.data)) {
      languageData[language[0]] = ((Number(language[1]) / langTotalChar) * 100)
        .toFixed(1)
        .toString();
    }

    returnData.push({
      id: repositoryEntry[1].id,
      full_name: repositoryEntry[1].full_name,
      name: repositoryEntry[1].name,
      ownerLogin: repositoryEntry[1].owner.login,
      description: repositoryEntry[1].description,
      url: repositoryEntry[1].html_url,
      languages: languageData,
      license: repositoryEntry[1].license
        ? {
            name: repositoryEntry[1].license.name,
            url: repositoryEntry[1].license.url,
          }
        : undefined,
      stargazers_count: repositoryEntry[1].stargazers_count,
    });
  }

  console.log(`\x1b[102m > \x1b[0m Returned Data`);
  console.log(returnData);
  return returnData;
}

export const getIndexFromID = (
  searchedRepoID: number,
  projects: Repository[],
) => {
  for (let i = 0; i <= projects.length; i++) {
    if (projects[i]?.id === searchedRepoID) {
      return i;
    }
  }
  return -1;
};
