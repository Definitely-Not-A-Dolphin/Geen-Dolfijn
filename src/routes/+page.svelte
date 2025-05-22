<script lang="ts">
  import { randomInt } from "../lib/main.js";
  import sizzle from "../images/NotBaldCat.jpg";
  import willy from "../images/BaldCat.jpg";
  import okkie from "../images/Okkie<3.jpg";

  const titles: string[] = [
    "Ik ben een titel",
    "I am a title",
    "Je suis une titre",
    "Ich bin ein Titel",
    "Jag är en title",
    "Minä olen titteli",
    "Es esmu tituls",
  ];
</script>

<div class="header">
  <h1>{titles[randomInt(0, titles.length - 1)]}</h1>
</div>

<div class="containerStandard">
  <div class="mainStandard">
    <p>
      Who am I? That is a good question. I do not know exactly either, but I can
      tell you what I am not: I am Definitely Not A Dolphin.
    </p>

    <p>
      What am I doing here? I am a math nerd, not computer nerd. My friends
      indoctrinated me into coding and I do not know whether I like it or not.
    </p>

    <p>
      Since I am still mainly a math nerd, check out my page with my favorite
      math thingeys!
    </p>
  </div>

  <img alt="My cat!" src={sizzle} class="imageStandard" />
</div>

<div class="containerStandard">
  <img alt="My other cat!" src={okkie} class="imageStandard" />

  <div class="mainStandard">
    <p class="nob">I "know" a few programming languages:</p>

    <ul class="not">
      <li>Python (never again)</li>
      <li>Javascript / TypeScript</li>
      <li>Svelte (yes I'm counting that, best framework btw)</li>
      <li>C++</li>
    </ul>

    <p>
      Also I am still learning so if you see code that just completely sucks: Do
      not worry, I am aware of it. Just leave an issue and I'll look into it. I
      am too busy skateboarding on the learning curve.
    </p>
  </div>
</div>
