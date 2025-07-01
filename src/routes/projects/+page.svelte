<script lang="ts">
  import { getData, getIndexFromID } from "$lib/getGitHubData.ts";
  import ProjectText from "$lib/projectText.svelte";
  import generalData from "$lib/generalData.json" with { type: "json" };

  import HornetRunning from "../../images/HornetRunning.gif";

  let projectArray: number[] = [];
  for (const projectID of Object.entries(generalData.IDs)) {
    projectArray.push(Number(projectID[1]));
  }

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

  const receivedData = getData(projectArray);
</script>

<div class="header">
  <h1 class="not nob" style="color: var(--projectcolor)">My Projects</h1>
</div>

<!-- Planning on making this an each loop -->
<!-- I made this an each loop! -->

{#snippet githubWidget(projects: any, repoId: number)}
  {@const SNIPPET_PROJECT = projects[getIndexFromID(repoId, projects)]}
  <h3 class="not">
    Definitely-Not-A-Dolphin/<br />
    <a href={SNIPPET_PROJECT.url}>
      {SNIPPET_PROJECT.name}
    </a>
  </h3>

  <p class="nob not">Languages</p>
  <ul class="not" style="font-size: 16px;">
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
        class="tooltip"
        style="
            width: {2.304 * Number(value)}px;
            height: 12px;
            background-color: {getColor(key)}
        "
      ></div>
    {/each}
  </div>
{/snippet}

{#each projectArray as projectEntry, index}
  <div class="containerStandard" style="flex-direction: {flexDirector(index)}">
    <div class="mainStandard">
      <ProjectText projectID={String(projectEntry)} />
    </div>

    <div class="githubWidget">
      {#await receivedData}
        <p>Waiting for project data...</p>
        <img src={HornetRunning} alt="Hornet Running" style="width: 200px;" />
      {:then projects}
        {@render githubWidget(projects, projectEntry)}
      {:catch error}
        Something went wrong while fetching data; error: "{error}"
      {/await}
    </div>
  </div>
{/each}
