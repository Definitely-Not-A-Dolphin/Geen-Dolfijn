<script lang="ts">
  import { draggable } from "@neodrag/svelte";
  import { neoDragConfig } from "$lib/utils.ts";
  import { page } from "$app/state";

  const emojis: { [thrownError: number]: string } = {
    404: "❓",
    420: "🫠",
    500: "💥",
  };
</script>

<div class="header" {@attach draggable(neoDragConfig)}>
  <h1>Whoops!</h1>
  <h2 class="nob">Something went wrong!</h2>
  <p class="not">
    Error code: {page.status}, {page.error?.message}
  </p>
  <h1>{emojis[page.status] ?? emojis[500]}</h1>
</div>
