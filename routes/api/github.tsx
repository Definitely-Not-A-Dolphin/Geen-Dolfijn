import type {
  GitHubRepository,
  Languages,
  Repository,
} from "@/lib/customTypes.ts";
import { define } from "../../utils.ts";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: Deno.env.get("GITHUB_TOKEN")!,
});

export const handler = define.handlers({
  async GET(ctx) {
    if (!Deno.env.get("GITHUB_TOKEN")) {
      console.error("Incomplete dotenv! Missing \x1b[34mGITHUB_TOKEN\x1b[0m");
      throw new Error(
        "Server error: missing github auth key, not your fault, sorry :(",
      );
    }

    const repoID = ctx.url.searchParams.get("repoID");
    if (!repoID) {
      throw new Error("Server error: no repo supplied :(");
    }

    const repositoryResponse = await octokit.request(
      `GET /repositories/${repoID}`,
    );

    if (repositoryResponse.status !== 200) {
      throw new Error(
        "Server error: something went wrong while fetching data :(",
      );
    }

    const repositoryData: GitHubRepository = repositoryResponse.data;

    console.log(
      `\x1b[44m > \x1b[0m Fetch Log: ${repositoryData.full_name}`,
      repositoryResponse.headers,
    );

    // Get the languages
    const languageResponse = await octokit.request(
      `GET ${repositoryData.languages_url}`,
    );

    if (repositoryResponse.status !== 200) {
      throw new Error(
        "Server error: something went wrong while fetching language data :(",
      );
    }

    console.log(
      `\x1b[43m > \x1b[0m Fetch Log Languages: ${repositoryData.full_name}`,
      languageResponse.headers,
    );

    const rawLanguageData: Languages = languageResponse.data;

    let totalCharacterCount = 0;
    for (const characterCount of Object.values(rawLanguageData)) {
      totalCharacterCount += characterCount;
    }

    const languageData: Languages = {};
    for (const [language, charCount] of Object.entries(rawLanguageData)) {
      const percent = Math.floor(charCount / totalCharacterCount * 1000) / 10;

      if (percent !== 0) languageData[language] = percent;
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

    return Response.json(returnData);
  },
});
