<script lang="ts">
  import { getData, getIndexFromID } from "$lib/getGitHubData.ts";
  import generalData from "$lib/generalData.json" with { type: "json" };
  import { SimpleContextFetchingStrategy } from "discord.js";

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
    <h2 class="nob not project">Finnish Language Trainer</h2>
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
    <h2 class="nob not project">This website</h2>
    <p class="nob not">
      This site is made with SvelteKit, TypeScript and all the other usual
      stuff. My friend Jsw helped me with the setup, and will host this site on
      his server soon.
    </p>

    <p class="nob">
      Some things that I wish to include / add in the future are:
    </p>
    <ul class="nob not">
      <li>A way to vertically display the language bar in the widget</li>
      <li>A better design on the background</li>
      <li>
        More banner-gifs on the frends-tab, although my friends won't make one.
        :(
      </li>
    </ul>
  </div>
</div>

<div class="containerStandard">
  <div class="mainStandard" style="text-align: left">
    <h2 class="nob not project">A Frog With A Knife</h2>
    <p class="not">
      One day I woke up and had the urge to make a discord bot. I do not know
      where it came from, but here it is anyway! It can translate to morse code
      and send memes based on a number. I plan on making it run 24/7 once I get
      a raspberry pi or a server!
    </p>

    <p class="nob not">
      Some things that I wish to include / add in the future are:
    </p>
    <ul class="nob not">
      <li>More memes, but I have to wait for a server first</li>
      <li>
        A way for trusted users (me, friends) to upload their memes via discord.
      </li>
    </ul>
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
