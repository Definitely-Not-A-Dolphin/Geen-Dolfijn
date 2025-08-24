import { Octokit } from "octokit";
import type {
  Repository,
  OctokitData,
  GitHubRepositoryCommits,
  GitHubRepository,
} from "./customTypes.ts";
import secretData from "./secretData.json" with { type: "json" };

export async function getData(idArray: number[]): Promise<Repository[]> {
  // Create octokit auth
  const octokit = new Octokit({
    auth: secretData.token,
  });

  // Request all the repos
  const repoData: OctokitData<GitHubRepository> = await octokit.request(
    "GET /users/definitely-not-a-dolphin/repos",
  );

  console.log("\x1b[44m > \x1b[0m Fetch Log");
  console.log(repoData.headers);

  let desiredRepoData = [];
  let returnData: Repository[] = [];

  for (const repository of Object.entries(repoData.data)) {
    if (idArray.includes(repository[1].id)) {
      desiredRepoData.push(repository);
    }
  }

  for (const repositoryEntry of desiredRepoData) {
    // Get the languages for each desired repository
    const rawLanguageData = await octokit.request("GET /{url}", {
      url: repositoryEntry[1].languages_url,
    });

    console.log("\x1b[43m > \x1b[0m Fetch Log \x1b[46mLanguages\x1b[0m");
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

    // Get the three latest commits for each desired repository
    const rawCommitsData: OctokitData<GitHubRepositoryCommits> =
      await octokit.request("GET /{url}", {
        url: repositoryEntry[1].commits_url,
      });

    console.log("\x1b[43m > \x1b[0m Fetch Log \x1b[45mCommits\x1b[0m");
    console.log(rawCommitsData.headers);

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
      latest_commit: {
        message: rawCommitsData.data[0].commit.message,
        author: rawCommitsData.data[0].author.login,
      },
    });
  }

  console.log("\x1b[102m > \x1b[0m Returned Data");
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

const __data = getData([915271815]);
console.log(__data);
