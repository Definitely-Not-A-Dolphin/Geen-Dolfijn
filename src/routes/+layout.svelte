<script lang="ts">
  import { page } from "$app/state";
  import data from "$lib/generalData.json" with { type: "json" };

  let { children } = $props();
</script>

<div class="centerer">
  <div class="fillerElement"></div>

  <div class="containerMain">
    {@render children()}

    <div class="containerButtons">
      {#each data.pages as pageName}
        {#if page.url.pathname != pageName[1]}
          <a href={pageName[1]}>
            <div class="button1">
              <p class="nob not">{pageName[0]}</p>
            </div>
          </a>
        {/if}
      {/each}
    </div>

    <div class="mentions">
      <h3>My frend</h3>
      {#each data.friends as friend}
        <span class="tooltip">
          <a href={friend.link}>
            <img
              class="mentionspfp"
              src={"https://avatars.githubusercontent.com/u/" +
                friend.pfpId +
                "?v=4"}
              alt={friend.name + "'s pfp"}
            />
          </a>
          <!-- <span class="tooltiptext">{friend.name + "'s pfp"}</span> -->
        </span>
      {/each}
    </div>
  </div>

  <div class="fillerElement"></div>
</div>
