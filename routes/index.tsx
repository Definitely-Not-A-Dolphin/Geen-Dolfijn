import HackatimeStats from "@/islands/HackatimeStats.tsx";
import LastFMStats from "@/islands/LastfmStats.tsx";
import { randomInt } from "@/lib/utils.ts";
import { define } from "@/utils.ts";
import { useDraggable } from "@neodrag/react";
import sizzle from "/NotBaldCat.jpg";
import okkie from "/Okkie<3.jpg";
import { useRef } from "preact/hooks";

export default define.page(function Home() {
  const draggableRef = useRef(null);
  useDraggable(draggableRef);
  const birthTimestamp = new Date("2008-12-31T13:00:00Z").getTime(); // Replace with your actual birth date
  const calculateAge = () =>
    ((Date.now() - birthTimestamp) / 31557600000).toFixed(8);

  const age = calculateAge();

  const titles: string[] = [
    "Ik ben een titel",
    "I am a title",
    "Je suis une titre",
    "Ich bin ein Titel",
    "Jag är en tittel",
    "Minä olen titteli",
    "Es esmu tituls",
  ] as const;

  return (
    <>
      <div class="header" ref={draggableRef}>
        <h1>{titles[randomInt(0, titles.length - 1)]}</h1>
      </div>

      <div class="containerStandard">
        <div class="standardBlock">
          <h1 style="color: var(--linkblue)" class="nob not">Hello there!</h1>

          <p class="not">
            My name is Derek Verduijn, aka Definitely Not A Dolphin or
            Killioiden Kaa. I am an {/* ToDo: make this update automatically */}
            {age}{" "}
            y/o computer and math enthusiast from The Netherlands studying
            Applied Mathematics @ TUDelft. Other interests include Finnish and
            chess.
          </p>

          <h3 class="nob not" style="color: var(--mathcolor);">Last.fm</h3>

          <LastFMStats />
        </div>

        <img alt="My cat!" src={sizzle} class="imageStandard" />
      </div>

      <div class="containerStandard">
        <img alt="My other cat!" src={okkie} class="imageStandard" />

        <div class="standardBlock">
          <h1 style="color: var(--linkblue)" class="nob not">Coding</h1>
          <p class="nob not">
            Currently I am working on Funktio and Geen-Dolfijn.
          </p>

          <p>
            To busy skateboarding on the learning curve to write code that
            doesn't suck.
          </p>

          <h3 style="color: var(--mathcolor)" class="nob not">Hackatime</h3>

          <HackatimeStats />
        </div>
      </div>
    </>
  );
});
