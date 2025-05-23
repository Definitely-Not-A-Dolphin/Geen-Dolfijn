<script lang="ts">
  import prplGif from "../images/prpl_wtf.gif";
  import { page } from "$app/state";

  const pages: string[][] = [
    ["Home", "/"],
    ["Projects", "/projects"],
    ["Desmos Gallery", "/desmos-gallery"],
    ["Blog Channel", "/blog-channel"],
  ];

  const friends = [
    {
      name: "Jsw",
      link: "https://jsw.tf",
      pfpId: "46420489",
    },
    {
      name: "Emma",
      link: "https://prpl.wtf",
      pfpId: "103201875",
    },
    {
      name: "Whacky",
      link: "https://whackydev.nl",
      pfpId: "148389656",
    },
    {
      name: "Elziy",
      link: "https://elziyplace.xyz",
      pfpId: "154922150",
    },
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
      {#each friends as friend}
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
  </div>

  <div class="fillerElement"></div>
</div>
