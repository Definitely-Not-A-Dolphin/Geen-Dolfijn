<script lang="ts">
  import sizzle from "../Images/NotBaldCat.jpg";
  import willy from "../Images/BaldCat.jpg";
  import okkie from "../Images/Okkie<3.jpg";
</script>

<div class="header">
  <h1>Ik ben een titel</h1>
</div>

<div class="containerIntro">
  <div class="intro">
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

  <img alt="My cat!" src={sizzle} class="sizzle" />
</div>

<div class="containerIntro">
  <img alt="My other cat!" src={okkie} class="sizzle" />

  <div class="intro">
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

<div class="containerButtons">
  <a href="/projects"
    ><div class="button1"><p class="nob not">Projects</p></div></a
  >
  <a href="/desmos-gallery"
    ><div class="button1">
      <p class="nob not">Desmos Gallery</p>
    </div></a
  >
  <a href="/secret"
    ><div class="button1">
      <p class="nob not">It's a secret</p>
    </div></a
  >
</div>
