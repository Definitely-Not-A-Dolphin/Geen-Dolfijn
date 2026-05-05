<script lang="ts">
  import hornetRunning from "$images/HornetRunning.gif";
  import sizzle from "$images/NotBaldCat.jpg";
  import okkie from "$images/Okkie<3.jpg";
  import type { HackaTimeToday, Track } from "$lib/customTypes.ts";
  import { getNeoDragContext, neoDragConfig, randomInt } from "$lib/utils.ts";
  import { draggable } from "@neodrag/svelte";
  import { onDestroy, onMount } from "svelte";

  const fetchLastFM = async (): Promise<boolean | Track> => {
    const response = await fetch("/fetch/last.fm");
    return await response.json();
  };

  const fetchHackaTime = async (): Promise<HackaTimeToday> => {
    const response = await fetch("/fetch/hackatime");
    return await response.json();
  };

  const birthTimestamp = new Date("2008-12-31T13:00:00Z").getTime(); // Replace with your actual birth date
  const calculateAge = () => {
    const now = Date.now();
    const age = (now - birthTimestamp) / (1000 * 60 * 60 * 24 * 365.25);
    return age.toFixed(8);
  };

  let age = calculateAge();

  let interval: number;
  onMount(() => {
    interval = setInterval(() => {
      age = calculateAge();
    }, 100);
  });

  onDestroy(() => clearInterval(interval));

  let neoDragContext = getNeoDragContext();

  const titles: string[] = [
    "Ik ben een titel",
    "I am a title",
    "Je suis une titre",
    "Ich bin ein Titel",
    "Jag är en tittel",
    "Minä olen titteli",
    "Es esmu tituls",
  ] as const;
</script>

<div class="header" {@attach draggable(neoDragConfig(neoDragContext.movable))}>
  <h1>{titles[randomInt(0, titles.length - 1)]}</h1>
</div>

<div class="containerStandard">
  <div
    class="mainStandard"
    {@attach draggable(neoDragConfig(neoDragContext.movable))}
  >
    <h1 style="color: var(--linkblue)" class="nob not">Hello there!</h1>

    <p class="not">
      My name is Derek Verduijn, aka Definitely Not A Dolphin. I am an {age}
      year old computer and math enthusiast from The Netherlands. Other interests
      include Finnish and chess.
    </p>

    {#await fetchLastFM()}
      <div style="display: flex; gap: 10px; justify-content: space-between;">
        <div>
          <h3 class="nob not" style="color: var(--mathcolor);">Last.fm</h3>
          <p class="not">Waiting last.fm data...</p>
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
              >
              from {trackData.album} by {trackData.artist}
            </p>
          </div>
          <div>
            <img
              style="border-radius: 15px; height: 120px;"
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
        failed, so enjoy this error message I guess! :D
      </p>
    {/await}
  </div>

  <img alt="My cat!" src={sizzle} class="imageStandard" />
</div>

<div class="containerStandard">
  <img alt="My other cat!" src={okkie} class="imageStandard" />

  <div
    class="mainStandard"
    {@attach draggable(neoDragConfig(neoDragContext.movable))}
  >
    <h1 style="color: var(--linkblue)" class="nob not">Coding</h1>
    <p class="nob not">
      Currently I am working on Kuusi and CCMath.
    </p>

    <p>
      Very busy skateboarding on the learning curve to write code that doesn't
      suck.
    </p>

    <h3 style="color: var(--mathcolor)" class="nob not">Hackatime</h3>

    {#await fetchHackaTime()}
      Currently fetching HackaTime data...
    {:then hackatimeData}
      {@const grandTotal = hackatimeData.data.grand_total}
      Today I have logged {grandTotal.total_seconds} seconds of coding, which is equal
      to
      {#if grandTotal.text === "Start coding to track your time"}
        nothing :/
      {:else}
        {grandTotal.text}!
      {/if}
    {:catch}
      Oops! Something went wrong while fetching data!
    {/await}
  </div>
</div>
