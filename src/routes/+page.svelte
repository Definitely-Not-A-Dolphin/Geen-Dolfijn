<script lang="ts">
  import { draggable } from "@neodrag/svelte";
  import { randomInt } from "$lib/utils.ts";
  import type { HackaTimeToday, Track } from "$lib/customTypes.ts";
  import hornetRunning from "$images/HornetRunning.gif";
  import sizzle from "$images/NotBaldCat.jpg";
  import okkie from "$images/Okkie<3.jpg";

  const fetchLastFM = async (): Promise<boolean | Track> => {
    const response = await fetch("/fetch/last.fm");
    return await response.json();
  };

  const fetchHackaTime = async (): Promise<HackaTimeToday> => {
    const response = await fetch("/fetch/hackatime");
    return await response.json();
  };

  const titles: string[] = [
    "Ik ben een titel",
    "I am a title",
    "Je suis une titre",
    "Ich bin ein Titel",
    "Jag är en tittel",
    "Minä olen titteli",
    "Es esmu tituls",
  ];
</script>

<div use:draggable={{ bounds: "body" }} class="header">
  <h1>{titles[randomInt(0, titles.length - 1)]}</h1>
</div>

<div class="containerStandard">
  <div use:draggable={{ bounds: "body" }} class="mainStandard">
    <h1 style="color: var(--linkblue)" class="nob not">Hello there!</h1>

    <p class="not">
      I am Definitely Not A Dolphin. I also go by Zedder. I speak Dutch,
      English, and learning Finnish. I like coding, gaming, and most of all:
      mathematics.
    </p>

    {#await fetchLastFM()}
      <div style="display: flex; gap: 10px; justify-content: space-between;">
        <div>
          <h3 class="nob not" style="color: var(--mathcolor);">Last.fm</h3>
          <p class="not">Waiting for project data...</p>
        </div>
        <div>
          <img
            src={hornetRunning}
            alt="Hornet Running"
            style="height: 140px;"
          />
        </div>
      </div>
    {:then trackData}
      {#if trackData === false}
        <h3 class="nob not" style="color: var(--mathcolor);">Last.fm</h3>
        <p class="not">Something went wrong while fetching Last.fm data D:</p>
      {:else if trackData === true}
        <h3 class="nob not" style="color: var(--mathcolor);">Last.fm</h3>
        <p class="not">I am not currently listening to any music</p>
      {:else}
        <div style="display: flex; gap: 10px; justify-content: space-between;">
          <div>
            <h3 class="nob not" style="color: var(--mathcolor);">Last.fm</h3>
            <p class="not">
              Currently listening to <a href={trackData.url}>{trackData.name}</a
              ><br />
              from {trackData.album} by {trackData.artist}
            </p>
          </div>
          <div>
            <img
              style="border-radius: 15px; height: 140px;"
              alt="album cover"
              src={trackData.image}
            />
          </div>
        </div>
      {/if}
    {:catch}
      <h3 class="nob not" style="color: var(--mathcolor);">Last.fm</h3>
      <p>
        I have no idea how the hell the data fetched errorless but the awaiting
        failed, so enjoy this error message I guess!
      </p>
    {/await}
  </div>

  <img use:draggable={{ bounds: "body" }} alt="My cat!" src={sizzle} class="imageStandard" />
</div>

<div class="containerStandard">
  <img use:draggable={{ bounds: "body" }}  alt="My other cat!" src={okkie} class="imageStandard" />

  <div use:draggable={{ bounds: "body" }} class="mainStandard">
    <h1 style="color: var(--linkblue)" class="nob not">Coding</h1>
    <p class="nob not">
      I currently write a lot of TypeScript, both for my discord bots and this
      website. I also did some C++, but kinda left it.
    </p>
    <p>
      Also I am still learning so if you see code that just completely sucks: Do
      not worry, I am aware of it. Just leave an issue and I'll look into it. I
      am too busy skateboarding on the learning curve.
    </p>

    <h3 style="color: var(--mathcolor)" class="nob not">Hackatime</h3>

    {#await fetchHackaTime()}
      Currently fetching HackaTime data.
    {:then thing}
      Today I have logged {thing.data.grand_total.total_seconds} seconds of coding,
      which is equal to {thing.data.grand_total.text}!
    {:catch}
      Oops! Something went wrong while fetching data!
    {/await}
  </div>
</div>
