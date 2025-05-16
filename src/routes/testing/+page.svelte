<script lang="ts">
  import { onMount } from "svelte";
  import { type GitHubRepository } from "$lib/githubTypes.ts";
  import { type Repository } from "$lib/customTypes.ts";

  const GITHUB_STORAGE_KEY: string = "GitHubData";
  const FETCH_INTERVAL: number = 1200000; // 20 minutes
  const GITHUB_BASE_URL: string = "https://api.github.com";

  async function getData(): Promise<Repository[]> {
    const storedLastUpdate = localStorage.getItem(
      `${GITHUB_STORAGE_KEY}_LastUpdate`,
    );
    const storedData = localStorage.getItem(GITHUB_STORAGE_KEY);
    let shouldFetch = false;

    // TODO: Please check if storedData actually exists. Deleted one of the cookie but not storedupdate and then it crashed.
    if (!storedLastUpdate) {
      shouldFetch = true;
    } else if (Date.now() - parseInt(storedLastUpdate) >= FETCH_INTERVAL) {
      shouldFetch = true;
    }

    if (shouldFetch) {
      let data = await getGitHubData();
      localStorage.setItem(GITHUB_STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(
	`${GITHUB_STORAGE_KEY}_LastUpdate`,
	Date.now().toString(),
      );

      return data // Returns data
    } else if (storedData) {
      return JSON.parse(storedData); // Returns localstorage
    } else {
      throw Error("Unable to fetch github data"); // Something went wrong
    }
  };

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

      // Aantal characters
      let langTotalChar: number = 0;

      for (const language of Object.entries(rawLanguageData)) {
        langTotalChar += Number(language[1]);
      }
      for (const language of Object.entries(rawLanguageData)) {
        languageData[language[0]] = (
          (Number(language[1]) / langTotalChar) *
          100
        )
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
</script>

{#await getData()}
  <p>Waiting for project data...</p>
{:then project}
  <!-- TODO: Removeme, this was for debugging purposes -->
  <!-- TODO: Please check if there are any github projects. projects.length > 0. -->
  <!-- {JSON.stringify(project)} -->
  {#each Object.entries(project[0].languages) as [key, value]}
    {value}% {key}<br />
  {/each}
{:catch e}
  Something went wrong while fetching data; error: "{e}"
{/await}
