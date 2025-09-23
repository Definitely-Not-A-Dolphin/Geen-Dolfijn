<script lang="ts">
  import { getRepoData } from "$lib/utils.ts";
  import ProjectText from "$lib/projectText.svelte";
  import generalData from "$lib/generalData.json" with { type: "json" };
  import hornetRunning from "../../images/HornetRunning.gif";
  import type { Repository } from "$lib/customTypes";

  const projectIDArray: number[] = [];
  for (const projectID of Object.entries(generalData.IDs)) {
    projectIDArray.push(projectID[1]);
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
</script>

<div class="header">
  <h1 class="not nob" style="color: var(--projectcolor)">My Projects</h1>
</div>

{#snippet githubWidget(project: Repository)}
  <h3 class="not">
    {project.ownerLogin}/<br />
    <a href={project.url}>
      {project.name}
    </a>
  </h3>

  <p class="nob not">Languages</p>
  <ul class="not" style="font-size: 16px;">
    {#each Object.entries(project.languages) as [key, value]}
      <li>
        {value}% <span style="color: {getColor(key)}">{key}</span>
      </li>
    {/each}
  </ul>

  <div
    style="
      display: flex;
      border-radius: 5px;
      overflow: hidden;
    "
  >
    {#each Object.entries(project.languages) as [key, value]}
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

{#each projectIDArray as projectID, index}
  <div class="containerStandard" style="flex-direction: {flexDirector(index)}">
    <div class="mainStandard">
      <ProjectText projectID={String(projectID)} />
    </div>

    <div class="githubWidget">
      {#await getRepoData(projectID)}
        <p>Waiting for project data...</p>
        <img src={hornetRunning} alt="Hornet Running" style="width: 200px;" />
      {:then project}
        {@render githubWidget(project)}
      {:catch error}
        Something went wrong while fetching data; error: "{error}"
      {/await}
    </div>
  </div>
{/each}
