<script lang="ts">
  import { onMount } from "svelte";
  import { type GitHubRepository } from "$lib/githubTypes.ts";
  import { type Repository } from "$lib/customTypes.ts";

  let projects: Repository[] = [];
  let loading: boolean = true;
  let error: string | null = null;

  const GITHUB_STORAGE_KEY: string = "GitHubData";
  const FETCH_INTERVAL: number = 1200000; // 20 minutes
  const GITHUB_BASE_URL: string = "https://api.github.com";

  onMount(async () => {
    try {
      const storedLastUpdate = localStorage.getItem(
        `${GITHUB_STORAGE_KEY}_LastUpdate`,
      );
      const storedData = localStorage.getItem(GITHUB_STORAGE_KEY);
      let shouldFetch = false;

      if (!storedLastUpdate) {
        shouldFetch = true;
      } else if (Date.now() - parseInt(storedLastUpdate) >= FETCH_INTERVAL) {
        shouldFetch = true;
      }

      if (shouldFetch) {
        projects = await getGitHubData();
        localStorage.setItem(GITHUB_STORAGE_KEY, JSON.stringify(projects));
        localStorage.setItem(
          `${GITHUB_STORAGE_KEY}_LastUpdate`,
          Date.now().toString(),
        );
      } else if (storedData) {
        projects = JSON.parse(storedData);
      }
    } catch (err) {
      error = (err as Error).message;
    } finally {
      loading = false;
    }
  });

  async function getGitHubData(): Promise<Repository[]> {
    const response = await fetch(
      `${GITHUB_BASE_URL}/users/definitely-not-a-dolphin/repos`,
    );
    if (!response.ok) {
      throw new Error(`GitHub response ${response.status}`);
    }
    const repoData: GitHubRepository[] = await response.json();
    let returnData: Repository[] = [];

    for (const project of repoData) {
      const response = await fetch(project.languages_url);
      if (!response.ok) {
        throw new Error(`GitHub response ${response.status}`);
      }
      const rawLanguageData: { [language: string]: number } =
        await response.json();
      let languageData: { [language: string]: string } = {};
      let langTotal: number = 0;

      for (const language of Object.entries(rawLanguageData)) {
        langTotal += Number(language[1]);
      }
      for (const language of Object.entries(rawLanguageData)) {
        languageData[language[0]] = ((Number(language[1]) / langTotal) * 100)
          .toFixed(1)
          .toString();
      }

      returnData.push({
        full_name: project.full_name,
        name: project.name,
        ownerLogin: project.owner.login,
        description: project.description,
        url: project.html_url,
        languages: languageData,
        license: project.license
          ? {
              name: project.license.name,
              url: project.license.url,
            }
          : undefined,
      });
    }

    return returnData;
  }

  const findIndex = (repoToFind: string) => {
    for (let i = 0; i <= projects.length; i++) {
      if (projects.at(i)?.name === repoToFind) {
        return i;
      };
    };

    return -1;
  };
</script>

{projects.at(findIndex("Definitely-Not-A-Dolphin"))?.description}
