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
      <h3 class="nob">My frend</h3>
      <p class="not">
        <a href="https://jsw.tf">jsw</a>
        <a href="https://whackydev.nl">wh4cky</a>
        <a href="https://prpl.wtf" rel="noopener">
          <img
            src={prplGif}
            alt="prplGif"
            width="88"
            height="31"
            style="image-rendering: crisp-edges; image-rendering: -webkit-optimize-contrast;"
          />
        </a>
        <a href="https://elziyplace.xyz">elziy</a>
      </p>
    </div>
  </div>
</div>
