<script lang="ts">
  import { draggable } from "@neodrag/svelte";
  import { neoDragConfig, getDragContext } from "$lib/utils.ts";
  import desmos from "./desmos.json" with { type: "json" };

  let dragContext = getDragContext<{ movable: boolean }>("dragThing");
</script>

<div class="header" {@attach draggable(neoDragConfig(dragContext.movable))}>
  <h1 class="not nob" style="color: var(--mathcolor);">Desmos Gallery</h1>
  <p class="not">Some cool things I made!</p>
</div>

{#each desmos.graphs as graph}
  <div
    class="main"
    style="text-align: center;"
    {@attach draggable(neoDragConfig(dragContext.movable))}
  >
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

<div
  class="main"
  style="text-align: center;"
  {@attach draggable(neoDragConfig(dragContext.movable))}
>
  <h2 class="nob not" style="color: var(--mathcolor)">Smaller things</h2>
  <p class="not">Some other small things I made.</p>
  {#each desmos.minorGraphs as graphs}
    {graphs.title}
    <a href={graphs.link}>{graphs.text}</a><br />
  {/each}
</div>
