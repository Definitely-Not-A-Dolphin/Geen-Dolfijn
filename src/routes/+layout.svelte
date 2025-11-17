<script lang="ts">
  import { draggable } from "@neodrag/svelte";
  import { neoDragConfig, setDragContext } from "$lib/utils.ts";
  import { page } from "$app/state";
  import generalData from "$lib/generalData.json" with { type: "json" };

  const toggle = () => (thing.movable = !thing.movable);
  let thing = $state({ movable: true });

  setDragContext("dragThing", thing);

  const { children } = $props();
</script>

{#snippet linkTo(page: string[])}
  <a href={page[1]}>
    <div class="button1">
      <p class="nob not">{page[0]}</p>
    </div>
  </a>
{/snippet}

<div class="centerer">
  <div class="fillerElement"></div>

  <div class="containerMain">
    {@render children()}

    <div class="containerButtons">
      {#if page.error}
        {#each generalData.pages as pageName, index}
          {#if index < 3}
            {@render linkTo(pageName)}
          {/if}
        {/each}
      {:else}
        {#each generalData.pages as pageName}
          {#if page.url.pathname != pageName[1]}
            {@render linkTo(pageName)}
          {/if}
        {/each}
      {/if}
    </div>

    <div class="mentions" {@attach draggable(neoDragConfig(thing.movable))}>
      <h3>My frend</h3>
      {#each generalData.friends as friend}
        <a href={friend.link}>
          <img
            class="mentionspfp"
            src={"https://avatars.githubusercontent.com/u/" +
              friend.pfpId +
              "?v=4"}
            alt={friend.name + "'s pfp"}
          />
        </a>
      {/each}
    </div>

    <button class="button1" style="width: 100%;" onclick={toggle}>
      <p class="nob not">
        {#if thing.movable}
          Disable draggability!
        {:else}
          Enable draggability!
        {/if}
      </p>
    </button>
  </div>

  <div class="fillerElement"></div>
</div>
