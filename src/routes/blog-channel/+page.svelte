<script lang="ts">
  import { draggable } from "@neodrag/svelte";
  import { neoDragConfig, getNeoDragContext } from "$lib/utils.ts";
  import data from "./blogs.json" with { type: "json" };

  let neoDragContext = getNeoDragContext();
</script>

<div class="header" {@attach draggable(neoDragConfig(neoDragContext.movable))}>
  <h1 class="not nob" style="color: var(--blogcolor)">Blog Channel</h1>
  <p class="not nob">I try to update it!</p>
</div>

{#each data.blogArray as blog}
  <div class="main" {@attach draggable(neoDragConfig(neoDragContext.movable))}>
    <h2 class="nob not" style="color: var(--blogcolor)">{blog.title}</h2>
    <p class="not">{blog.subtitle}</p>
    <p class="nob">{blog.blog}</p>
    <p class="small">{blog.date}</p>
  </div>
{/each}
