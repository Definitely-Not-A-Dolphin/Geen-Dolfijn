<script lang="ts">
  import { draggable } from "@neodrag/svelte";
  import desmos from "./desmos.json" with { type: "json" };
</script>

<div class="header">
  <h1 class="not nob" style="color: var(--mathcolor);">Desmos Gallery</h1>
  <p class="not">Some cool things I made!</p>
</div>

{#each desmos.graphs as graph}
  <div class="main" style="text-align: center;">
    <h2 class="nob not" style="color: var(--mathcolor)">{graph.title}</h2>
    <p class="not">
      {graph.discription}
    </p>
    <p class="nob not">
      A link to the submission as of {graph.date}:
      <a href={graph.link}>{graph.text}</a>
    </p>
  </div>
{/each}

<div class="main" style="text-align: center;">
  <h2 class="nob not" style="color: var(--mathcolor)">Smaller things</h2>
  <p class="not">Some other small things I made.</p>
  {#each desmos.minorGraphs as graphs}
    {graphs.title}
    <a href={graphs.link}>{graphs.text}</a><br />
  {/each}
</div>
