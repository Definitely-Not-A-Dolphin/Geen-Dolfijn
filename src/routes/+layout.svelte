<script lang="ts">
  import prplGif from "../Images/prpl_wtf.gif";
  import { page } from "$app/state";

  let { children } = $props();
</script>

<div class="centerer">
  <div class="containerMain">
    {@render children()}

    <div class="containerButtons">
      {#if page.url.pathname != "/"}
        <a href="/"
          ><div class="button1">
            <p class="nob not">Home</p>
          </div></a
        >
      {/if}
      {#if page.url.pathname != "/projects"}
      <a href="/projects"
        ><div class="button1">
          <p class="nob not">Projects</p>
        </div></a
      >
      {/if}
      {#if page.url.pathname != "/desmos-gallery"}
      <a href="/desmos-gallery"
        ><div class="button1">
          <p class="nob not">Desmos Gallery</p>
        </div></a
      >
      {/if}
      {#if page.url.pathname != "/blog-channel"}
      <a href="/blog-channel"
        ><div class="button1">
          <p class="nob not">Blog Channel</p>
        </div></a
      >
      {/if}
    </div>

    <div class="mentions">
      <h3 class="nob">My frend {page.url.pathname}</h3>
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
