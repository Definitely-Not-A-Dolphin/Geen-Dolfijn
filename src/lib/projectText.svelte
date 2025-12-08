<script lang="ts">
  const { projectID } = $props();
</script>

{#if projectID === "1065728389"}
  <h2 class="nob not project" style="color: var(--projectcolor)">Opi-Suomea</h2>
  <p class="not">
    I learn Finnish, and I wanted to learn Rust. I previously made the
    Finnish-Language-Trainer with C++, but quit development for it because C++
    gave me constant headaches.
  </p>
  <p class="nob not">
    Some things that I wish to include / add in the future are:
  </p>
  <ul class="nob not">
    <li>More lessons</li>
    <li>More grammar explainations.</li>
    <li>More types of lessons</li>
  </ul>
{:else if projectID === "915271815"}
  <h2 class="nob not project" style="color: var(--projectcolor)">
    Geen-Dolfijn
  </h2>
  <p class="nob not">
    This site is made with SvelteKit, TypeScript and all the other usual stuff.
    My friend Jsw helped me with the setup, and its hosted on his server!
  </p>

  <p class="nob">Some things that I wish to include / add in the future are:</p>
  <ul class="nob not">
    <li>
      More banner-gifs on the frends-tab, although my friends won't make one. :(
    </li>
    <li>A contact me div on the home page!</li>
  </ul>
{:else if projectID === "971248396"}
  <h2 class="nob not project" style="color: var(--projectcolor)">
    A Frog With A Knife
  </h2>
  <p class="not">
    One day I woke up and had the urge to make a discord bot. I do not know
    where it came from, but here it is anyway! I plan on making it run 24/7 once
    I get a raspberry pi or a server!
  </p>

  <p class="nob not">
    Some things that I wish to include / add in the future are:
  </p>
  <ul class="nob not">
    <li>Mipo: a simple game with complicated strategies</li>
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
{:else if projectID === "1097844217"}
  <h2 class="nob not project" style="color: var(--projectcolor)">DenoDing</h2>
  <p class="not">
    A small API for a ToDo site im making. I still have to make a frontend but
    this is already mostly done
  </p>

  <p class="nob not">
    Some things that I wish to include / add in the future are:
  </p>
  <ul class="nob not">
    <li>Custom types of To Do entries</li>
    <li>Maybe make it available for other ppl as well</li>
  </ul>
{/if}
