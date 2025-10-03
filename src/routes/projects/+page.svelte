<script lang="ts">
  import { draggable } from "@neodrag/svelte";
  import { neoDragConfig, getDragContext } from "$lib/utils.ts";
  import ProjectText from "$lib/projectText.svelte";
  import generalData from "$lib/generalData.json" with { type: "json" };
  import hornetRunning from "../../images/HornetRunning.gif";
  import type { Repository } from "$lib/customTypes.ts";

  let dragContext = getDragContext<{ movable: boolean }>("dragThing");

  const fetchGitHub = async (repoID: number) => {
    const response = await fetch(`/fetch/github?repoID=${repoID}`);
    return await response.json();
  };

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
    if (counter % 2 === 0) return "row";
    return "row-reverse";
  };
</script>

<div class="header" {@attach draggable(neoDragConfig(dragContext.movable))}>
  <h1 style="color: var(--projectcolor)">My Projects</h1>
</div>

{#snippet githubWidget(project: Repository)}
  <h3 class="halfb not">
    <img
      alt="owner_avatar_url"
      src={project.owner.avatarUrl}
      style="height: 20px; border-radius: 10px;"
    />
    {project.owner.login}/<br />
    <a href={project.url}>
      {project.name}
    </a>
  </h3>

  {@const stars = Math.min(project.stargazerCount, 6)}
  <p class="halfb halft">
    {#each Array.from(Array(stars).keys()) as _}
      <svg
        height="16"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        style="fill: #e3b341"
      >
        <path
          d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
        ></path>
      </svg>
    {/each}
    {#if project.stargazerCount > 6}
      +
    {/if}
  </p>

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

{#each generalData.repoIDs as projectID, index}
  <div class="containerStandard" style="flex-direction: {flexDirector(index)}">
    <div
      class="mainStandard"
      {@attach draggable(neoDragConfig(dragContext.movable))}
    >
      <ProjectText projectID={String(projectID)} />
    </div>

    <div
      class="githubWidget"
      {@attach draggable(neoDragConfig(dragContext.movable))}
    >
      {#await fetchGitHub(projectID)}
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
