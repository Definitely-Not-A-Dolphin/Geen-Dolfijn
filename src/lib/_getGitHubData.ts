import { Octokit } from "octokit";
import type { Repository, GitHubRepository } from "./customTypes.ts";
import secretData from "./secretData.json" with { type: "json" };

const octokit = new Octokit({
  auth: secretData.token,
});

const repoData = await octokit.request("GET /users/{username}/repos", {
  username: "definitely-not-a-dolphin",
});

for (const entry of repoData.data) {
  console.log(entry.full_name);
}

/*
export function unrawData(): Repository[] {
  let returnData: Repository[] = [];

  for (const dataEntry of Object.entries(data)) {
    const rawLanguageData: { [language: string]: number } =
      await response.json();
    let languageData: { [language: string]: string } = {};

    // Aantal characters
    let langTotalChar: number = 0;

    for (const language of Object.entries(rawLanguageData)) {
      langTotalChar += Number(language[1]);
    }
    for (const language of Object.entries(rawLanguageData)) {
      languageData[language[0]] = ((Number(language[1]) / langTotalChar) * 100)
        .toFixed(1)
        .toString();
    }

    returnData.push({
      id: dataEntry.id,
      full_name: dataEntry.full_name,
      name: dataEntry.name,
      ownerLogin: dataEntry.owner.login,
      description: dataEntry.description,
      url: dataEntry.html_url,
      languages: languageData,
      license: dataEntry.license
        ? {
            name: dataEntry.license.name,
            url: dataEntry.license.url,
          }
        : undefined,
      stargazers_count: dataEntry.stargazers_count,
    });
  }

  return returnData;
}
let repoArray = [];
*/
