<script lang="ts">
  import { getData, getIndexFromID } from "$lib/getGitHubData.ts";
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
</script>

<div class="header">
  <h1 class="not nob project">My Projects</h1>
</div>

<!-- Planning on making this an each loop -->

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
      {@const FIN_LANG_TRAIN_PROJECT =
        projects[getIndexFromID(898363939, projects)]}
      <h3 class="not">
        Definitely-Not-A-Dolphin/<br />
        <a href={FIN_LANG_TRAIN_PROJECT.url}>
          {FIN_LANG_TRAIN_PROJECT.name}
        </a>
      </h3>

      <p class="nob not">Languages:</p>
      <ul class="not">
        {#if projects.length > 0}
          {#each Object.entries(FIN_LANG_TRAIN_PROJECT.languages) as [key, value]}
            <li>
              {value}% <span style="color: {getColor(key)}">{key}</span>
            </li>
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

<div class="containerStandard">
  <div class="githubWidget">
    {#await getData()}
      <p>Waiting for project data...</p>
    {:then projects}
      <!-- The ID for this repo is 915271815 -->
      {@const GEEN_DOLFIJN_PROJECT =
        projects[getIndexFromID(915271815, projects)]}
      <h3 class="not">
        Definitely-Not-A-Dolphin /<br />
        <a href={GEEN_DOLFIJN_PROJECT.url}>
          {GEEN_DOLFIJN_PROJECT.name}
        </a>
      </h3>

      <p class="nob not">Languages:</p>
      <span class="not">
        {#if projects.length > 0}
          <!-- I will make this work
          <div style="display: flex;">
            {#each Object.entries(GEEN_DOLFIJN_PROJECT.languages) as [key, value]}
              <div
                style="width: {2.304 * Number(value)}px;
                       height: 12px;
                       background-color: {getColor(key)}
                       "
              ></div>
            {/each}
          </div>
          -->

          {#each Object.entries(GEEN_DOLFIJN_PROJECT.languages) as [key, value]}
            <li>
              {value}% <span style="color: {getColor(key)}">{key}</span>
            </li>
          {/each}
        {/if}
      </span>

      <p>
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
        {GEEN_DOLFIJN_PROJECT.stargazers_count}
      </p>
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

    <p class="nob not">
      Some things that I wish to include / add in the future are:
    </p>
    <ul class="nob not">
      <li>
        <s>
          A GitHub API, so that the data displayed on the left here doesn't have
          to be entered manually.
        </s>
      </li>
      <li>An animation on the background</li>
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
        <s>
          A quotes command (quoting random stuff from each other is a running
          joke in our server :D)
        </s>
      </li>
    </ul>
  </div>

  <div class="githubWidget">
    {#await getData()}
      <p>Waiting for project data...</p>
    {:then projects}
      <!-- The ID for this repo is 971248396 -->
      {@const DC_BOT_PROJECT = projects[getIndexFromID(971248396, projects)]}
      <h3 class="not githubTitle">
        Definitely-Not-A-Dolphin /<br />
        <a href={DC_BOT_PROJECT.url}>{DC_BOT_PROJECT.name}</a>
      </h3>

      <p class="nob not">Languages:</p>
      <ul class="not">
        {#if projects.length > 0}
          {#each Object.entries(DC_BOT_PROJECT.languages) as [key, value]}
            <li>
              {value}%
              <span style="color: {getColor(key)}">{key}</span>
            </li>
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
