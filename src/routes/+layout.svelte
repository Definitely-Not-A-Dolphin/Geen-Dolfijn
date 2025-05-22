<script lang="ts">
  import prplGif from "../images/prpl_wtf.gif";
  import { page } from "$app/state";

  const pages: string[][] = [
    ["Home", "/"],
    ["Projects", "/projects"],
    ["Desmos Gallery", "/desmos-gallery"],
    ["Blog Channel", "/blog-channel"],
  ];

  let { children } = $props();
</script>

<div class="centerer">
  <div class="fillerElement"></div>

  <div class="containerMain">
    {@render children()}

    <div class="containerButtons">
      {#each pages as pageName}
        {#if page.url.pathname != pageName[1]}
          <a href={pageName[1]}
            ><div class="button1">
              <p class="nob not">{pageName[0]}</p>
            </div></a
          >
        {/if}
      {/each}
    </div>
    <div class="mentions">
      <h3>My frend</h3>
      <!-- <p>
        <a href="https://prpl.wtf" rel="noopener">
          <img
            src={prplGif}
            alt="prplGif"
            width="88"
            height="31"
            style="image-rendering: crisp-edges; image-rendering: -webkit-optimize-contrast;"
          />
        </a>
      </p> -->
      <a href="https://jsw.tf">
        <img
          class="mentionspfp"
          src="https://avatars.githubusercontent.com/u/46420489?v=4"
          alt="jsw's pfp"
        />
      </a>
      <a href="https://prpl.wtf" data-tip="Emma">
        <img
          class="mentionspfp"
          src="https://avatars.githubusercontent.com/u/103201875?v=4"
          alt="emma's pfp"
        />
      </a>
      <a href="https://whackydev.nl">
        <img
          class="mentionspfp"
          src="https://avatars.githubusercontent.com/u/148389656?v=4"
          alt="whacky's pfp"
        />
      </a>
      <a href="https://elziyplace.xyz">
        <img
          class="mentionspfp"
          src="https://avatars.githubusercontent.com/u/154922150?v=4"
          alt="elziy's pfp"
        />
      </a>
    </div>
  </div>

  <div class="fillerElement"></div>
</div>
