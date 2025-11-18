import { json, type RequestEvent } from "@sveltejs/kit";
import type {
  GitHubRepository,
  Language,
  Repository,
} from "$lib/customTypes.ts";
import { GITHUB_TOKEN } from "$env/static/private";

export async function GET({ url }: RequestEvent): Promise<Response> {
  if (!GITHUB_TOKEN) {
    console.error("Incomplete dotenv! Missing \x1b[34mGITHUB_TOKEN\x1b[0m");
    return json(false);
  }

  const repoID: string | null = url.searchParams.get("repoID");
  if (!repoID) return json(false);

  const repositoryResponse = await fetch(
    `https://api.github.com/repositories/${repoID}`,
    {
      method: "GET",
      headers: {
        access_token: GITHUB_TOKEN,
      },
    },
  );

  if (!repositoryResponse.ok) return json(false);

  // Request the repo with matching IDs
  const repositoryData: GitHubRepository = await repositoryResponse.json();

  console.log(
    `\x1b[44m > \x1b[0m Fetch Log: ${repositoryData.full_name}`,
    repositoryResponse.headers,
  );

  // Get the languages
  const languageResponse = await fetch(
    repositoryData.languages_url,
    {
      method: "GET",
      headers: {
        access_token: GITHUB_TOKEN,
      },
    },
  );

  if (!languageResponse.ok) return json(false);

  console.log(
    `\x1b[43m > \x1b[0m Fetch Log Languages: ${repositoryData.full_name}`,
    languageResponse.headers,
  );

  const rawLanguageData: Language = await languageResponse.json();

  // Aantal characters
  let totalCharacterCount = 0;
  for (const [, characterCount] of Object.entries(rawLanguageData)) {
    totalCharacterCount += characterCount;
  }

  const languageData: Language = {};
  for (const [language, charCount] of Object.entries(rawLanguageData)) {
    const percent = Math.floor(charCount / totalCharacterCount * 1000) / 10;
    // Equivalent of break as long as github doesn't switch the descending order of languages
    if (percent === 0) continue;
    languageData[language] = percent;
  }

  const returnData: Repository = {
    id: repositoryData.id,
    fullName: repositoryData.full_name,
    name: repositoryData.name,
    owner: {
      login: repositoryData.owner.login,
      avatarUrl: repositoryData.owner.avatar_url,
    },
    description: repositoryData.description,
    url: repositoryData.html_url,
    languages: languageData,
    license: repositoryData.license
      ? {
        name: repositoryData.license.name,
        url: repositoryData.license.url,
      }
      : null,
    stargazerCount: repositoryData.stargazers_count,
  };

  console.log(
    `\x1b[102m > \x1b[0m Returned Data: ${repositoryData.full_name}`,
    returnData,
  );

  return json(returnData);
}
