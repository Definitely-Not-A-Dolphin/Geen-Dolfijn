<script lang="ts">
  import prplGif from "../Images/prpl_wtf.gif";

  let { children } = $props();
</script>

<div class="centerer">
  <div class="containerMain">
    {@render children()}

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
