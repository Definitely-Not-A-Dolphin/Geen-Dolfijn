<script lang="ts">
  import { getData, getIndexFromID } from "$lib/getGitHubData.ts";
  import ProjectText from "$lib/projectText.svelte";
  import generalData from "$lib/generalData.json" with { type: "json" };

  const getColor = (language: string): string => {
    for (const looper of Object.entries(generalData.languageColors)) {
      if (language === looper[0]) {
        return (
          "rgb(" + looper[1][0] + "," + looper[1][1] + "," + looper[1][2] + ")"
        );
      }
    }
    return "white";
  };

  const flexDirector = (counter: number): string => {
    if (counter % 2 === 0) {
      return "row";
    }
    return "row-reverse";
  };
</script>

<div class="header">
  <h1 class="not nob project">My Projects</h1>
</div>

<!-- Planning on making this an each loop -->

{#snippet githubWidget(projects: any, repoId: number)}
  {@const SNIPPET_PROJECT = projects[getIndexFromID(repoId, projects)]}
  <h3 class="not">
    Definitely-Not-A-Dolphin/<br />
    <a href={SNIPPET_PROJECT.url}>
      {SNIPPET_PROJECT.name}
    </a>
  </h3>

  <p class="nob not">Languages</p>
  <ul class="not">
    {#if projects.length > 0}
      {#each Object.entries(SNIPPET_PROJECT.languages) as [key, value]}
        <li>
          {value}% <span style="color: {getColor(key)}">{key}</span>
        </li>
      {/each}
    {/if}
  </ul>

  <p>Stars: {SNIPPET_PROJECT.stargazers_count}</p>

  <div
    style="
      display: flex;
      border-radius: 5px;
      overflow: hidden;
    "
  >
    {#each Object.entries(SNIPPET_PROJECT.languages) as [key, value]}
      <div
        style="
            width: {2.304 * Number(value)}px;
            height: 12px;
            background-color: {getColor(key)}
        "
      ></div>
    {/each}
  </div>
{/snippet}

<div class="containerStandard">
  <div class="mainStandard">
    <ProjectText projectID="898363939" />
  </div>

  <div class="githubWidget">
    {#await getData()}
      <p>Waiting for project data...</p>
    {:then projects}
      <!-- The ID for this repo is 898363939 -->
      {@render githubWidget(projects, 898363939)}
    {:catch error}
      Something went wrong while fetching data; error: "{error}"
    {/await}
  </div>
</div>

<div class="containerStandard">
  <div class="githubWidget">
    {#await getData()}
      <p>Waiting for project data...</p>
    {:then projects}
      <!-- The ID for this repo is 915271815 -->
      {@render githubWidget(projects, 915271815)}
    {:catch error}
      Something went wrong while fetching data; error: "{error}"
    {/await}
  </div>

  <div class="mainStandard">
    <ProjectText projectID="915271815" />
  </div>
</div>

<div class="containerStandard">
  <div class="mainStandard" style="text-align: left">
    <ProjectText projectID="898363939" />
  </div>

  <div class="githubWidget">
    {#await getData()}
      <p>Waiting for project data...</p>
    {:then projects}
      <!-- The ID for this repo is 971248396 -->
      {@render githubWidget(projects, 971248396)}
    {:catch error}
      Something went wrong while fetching data; error: "{error}"
    {/await}
  </div>
</div>
