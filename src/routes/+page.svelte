<script lang="ts">
  import { randomInt } from "../lib/main.js";
  import sizzle from "../images/NotBaldCat.jpg";
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
    <h1 style="color: var(--linkblue)" class="nob not">Hello there!</h1>

    <p class="not">
      I am Definitely Not A Dolphin. Dolphins are terrible creatures, so I
      thought "lets get that out of the way!". I like coding, gaming, and most
      of all: mathematics.
    </p>

    <p>
      I do coding purely as a hobby, so anything I make is just for funsies! I
      don't really care about how memory safe C++ is, because I'm not going to
      use it for anything professional, its just for fun (as far as you can call
      C++ fun).
    </p>

    <p>
      My point is: my motivator for learning coding is curiosity: not money, not
      fame, just curiosity. And I think we should do that more often.
    </p>
  </div>

  <img alt="My cat!" src={sizzle} class="imageStandard" />
</div>

<div class="containerStandard">
  <img alt="My other cat!" src={okkie} class="imageStandard" />

  <div class="mainStandard">
    <h1 style="color: var(--linkblue)" class="nob not">Coding</h1>
    <p class="nob not">I "know" a few programming languages:</p>

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
