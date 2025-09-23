<script lang="ts">
  let { projectID } = $props();
</script>

{#if projectID === "898363939"}
  <h2 class="nob not project" style="color: var(--projectcolor)">
    Finnish Language Trainer
  </h2>
  <p class="not">
    I learn Finnish, and I also like C++ (counter arguments will not be listened
    to), so I combined the two to make the Finnish Language Trainer.
  </p>
  <p class="nob not">
    Some things that I wish to include / add in the future are:
  </p>
  <ul class="nob not">
    <li>
      Colors, since everything happens in the terminal, colors can help
      organising all the text, and it looks aesthetically pleasing.
    </li>
    <li>More grammar explainations.</li>
    <li>
      A way to practise numbers up to a million, but without having to type the
      first million numbers out in a file.
    </li>
  </ul>
{:else if projectID === "915271815"}
  <h2 class="nob not project" style="color: var(--projectcolor)">
    This website
  </h2>
  <p class="nob not">
    This site is made with SvelteKit, TypeScript and all the other usual stuff.
    My friend Jsw helped me with the setup, and will host this site on his
    server soon.
  </p>

  <p class="nob">Some things that I wish to include / add in the future are:</p>
  <ul class="nob not">
    <li>A better design on the background</li>
    <li>
      More banner-gifs on the frends-tab, although my friends won't make one. :(
    </li>
  </ul>
{:else if projectID === "971248396"}
  <h2 class="nob not project" style="color: var(--projectcolor)">
    A Frog With A Knife
  </h2>
  <p class="not">
    One day I woke up and had the urge to make a discord bot. I do not know
    where it came from, but here it is anyway! It can translate to morse code
    and send memes. I plan on making it run 24/7 once I get a raspberry pi or a
    server!
  </p>

  <p class="nob not">
    Some things that I wish to include / add in the future are:
  </p>
  <ul class="nob not">
    <li>More memes, but I have to wait for a server first</li>
    <li>
      A way for trusted users (me, friends) to upload their memes via discord.
    </li>
  </ul>
{:else if projectID === "1002157693"}
  <h2 class="nob not project" style="color: var(--projectcolor)">
    The Breadener
  </h2>
  <p class="not">
    Some time ago I made a discord server about bread and decided to make a bot
    for it. Now, it uses a database for infections, so you can register your
    infection, and check how many infections anyone has. It also auto-assigns
    roles to everyone in the database based on how many infectedtions they did,
    and more.
  </p>

  <p class="nob not">
    Some things that I wish to include / add in the future are:
  </p>
  <ul class="nob not">
    <li>Nothing, I did everything</li>
  </ul>
{/if}
