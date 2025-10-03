<script lang="ts">
  import { draggable } from "@neodrag/svelte";
  import { neoDragConfig, getDragContext } from "$lib/utils.ts";
  import data from "./blogs.json" with { type: "json" };

  let dragContext = getDragContext<{ movable: boolean }>("dragThing");
</script>

<div class="header" {@attach draggable(neoDragConfig(dragContext.movable))}>
  <h1 class="not nob" style="color: var(--blogcolor)">Blog Channel</h1>
  <p class="not nob">I try to update it!</p>
</div>

{#each data.blogArray as thing}
  <div class="main" {@attach draggable(neoDragConfig(dragContext.movable))}>
    <h2 class="nob not" style="color: var(--blogcolor)">{thing.title}</h2>
    <p class="not">{thing.subtitle}</p>
    <p class="nob">{thing.blog}</p>
    <p class="small">{thing.date}</p>
  </div>
{/each}
