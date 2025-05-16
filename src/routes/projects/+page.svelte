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

    if (!storedData) {
      throw Error("storedData does not exist");
    }

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

      return data; // Returns data
    } else if (storedData) {
      return JSON.parse(storedData); // Returns localstorage
    } else {
      throw Error("Unable to fetch github data"); // Something went wrong
    }
  }

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
        id: project.id,
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
        stargazers_count: project.stargazers_count,
      });
    }

    return returnData;
  }

  const getIndexFromID = (
    searchedRepoID: number,
    projects: Array<Repository>,
  ) => {
    for (let i = 0; i <= projects.length; i++) {
      if (projects[i]?.id === searchedRepoID) {
        return i;
      }
    }
    return -1;
  };

  const GEEN_DOLFIJN_ID: number = 915271815;
  const FIN_LANG_TRAIN_ID: number = 898363939;
  const DC_BOT_ID: number = 971248396;
</script>

<div class="header">
  <h1 class="not nob">My Projects</h1>
</div>

<div class="containerProject">
  <div class="projectText">
    <h2 class="nob not">Finnish Language Trainer</h2>
    <p class="not">
      I learn Finnish, and I also like C++ (counter arguments will not be
      listened to), so I combined the two to make the Finnish Language Trainer.
    </p>
    <p class="nob not">
      Some things that I wish to include / add in the future are:
    </p>
    <ul class="nob not">
      <li>
        Colors, since everything happens in the terminal, colors can help
        organising all the text, and it looks aesthetically pleasing.
      </li>
      <li>More grammar explainations.</li>
      <li>
        A way to practise numbers up to a million, but without having to type
        the first million numbers out in a file.
      </li>
    </ul>
  </div>

  <div class="githubWidget">
    {#await getData()}
      <p>Waiting for project data...</p>
    {:then projects}
      <!-- The ID for this repo is 898363939 -->
      {@const FIN_LANG_TRAIN_PROJECT =
        projects[getIndexFromID(898363939, projects)]}
      <h3 class="not">
        Definitely-Not-A-Dolphin /<br />
        <a href={FIN_LANG_TRAIN_PROJECT.url} id="github"
          >{FIN_LANG_TRAIN_PROJECT.name}
        </a>
      </h3>

      <p class="nob not">Languages:</p>
      <ul class="not">
        {#if projects.length > 0}
          {#each Object.entries(FIN_LANG_TRAIN_PROJECT.languages) as [key, value]}
            <li>{value}% {key}</li>
          {/each}
        {/if}
      </ul>

      <p>
        Stars: {FIN_LANG_TRAIN_PROJECT.stargazers_count}
      </p>
    {:catch error}
      Something went wrong while fetching data; error: "{error}"
    {/await}
  </div>
</div>

<div class="containerProject">
  <div class="githubWidget">
    {#await getData()}
      <p>Waiting for project data...</p>
    {:then projects}
      <!-- The ID for this repo is 915271815 -->
      {@const GEEN_DOLFIJN_PROJECT =
        projects[getIndexFromID(915271815, projects)]}
      <h3 class="not">
        Definitely-Not-A-Dolphin /<br />
        <a href={GEEN_DOLFIJN_PROJECT.url} id="github"
          >{GEEN_DOLFIJN_PROJECT.name}
        </a>
      </h3>

      <p class="nob not">Languages:</p>
      <ul class="not">
        {#if projects.length > 0}
          {#each Object.entries(GEEN_DOLFIJN_PROJECT.languages) as [key, value]}
            <li>{value}% {key}</li>
          {/each}
        {/if}
      </ul>

      <p>
        Stars: {GEEN_DOLFIJN_PROJECT.stargazers_count}
      </p>
    {:catch error}
      Something went wrong while fetching data; error: "{error}"
    {/await}
  </div>

  <div class="projectText">
    <h2 class="nob not">This website</h2>
    <p class="nob not">
      This site is made with SvelteKit, TypeScript and all the other usual
      stuff. My friend Jsw helped me with the setup, and will host this site on
      his server soon.
    </p>

    <p class="nob not">
      Some things that I wish to include / add in the future are:
    </p>
    <ul class="nob not">
      <li>
        <s
          >A GitHub API, so that the data displayed on the left here doesn't
          have to be entered manually.</s
        >
      </li>
      <li>An animation on the background</li>
      <li>
        More banner-gifs on the frends-tab, although my friends won't make one.
        :(
      </li>
    </ul>
  </div>
</div>

<div class="containerProject">
  <div class="projectText">
    <h2 class="nob not">A Frog With A Knife</h2>
    <p class="not">
      One day I woke up and had the urge to make a discord bot. I do not know
      where it came from, but here it is anyway! It can translate to morse code
      and send memes based on a number. I plan on making it run 24/7 once I get
      a raspberry pi!
    </p>
    <p class="nob not">
      Some things that I wish to include / add in the future are:
    </p>
    <ul class="nob not">
      <li>More memes, but I have to wait for a server first</li>
      <li>
        A way for trusted users (me, friends) to upload their memes via discord.
      </li>
      <li>
        A quotes command (quoting random stuff from each other is a running joke
        in our server :D)
      </li>
    </ul>
  </div>

  <div class="githubWidget">
    {#await getData()}
      <p>Waiting for project data...</p>
    {:then projects}
      <!-- The ID for this repo is 971248396 -->
      {@const DC_BOT_PROJECT = projects[getIndexFromID(971248396, projects)]}
      <h3 class="not">
        Definitely-Not-A-Dolphin /<br />
        <a href={DC_BOT_PROJECT.url} id="github">{DC_BOT_PROJECT.name} </a>
      </h3>

      <p class="nob not">Languages:</p>
      <ul class="not">
        {#if projects.length > 0}
          {#each Object.entries(DC_BOT_PROJECT.languages) as [key, value]}
            <li>{value}% {key}</li>
          {/each}
        {/if}
      </ul>

      <p>
        Stars: {DC_BOT_PROJECT.stargazers_count}
      </p>
    {:catch error}
      Something went wrong while fetching data; error: "{error}"
    {/await}
  </div>
</div>
