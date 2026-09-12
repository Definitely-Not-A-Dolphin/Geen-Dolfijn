import HackatimeStats from "@/islands/HackatimeStats.tsx";
import { define } from "@/utils.ts";

export default define.page(function Home() {
  const birthTimestamp = new Date("2008-12-31T13:00:00Z").getTime();
  const calculateAge = () =>
    ((Date.now() - birthTimestamp) / 31557600000).toFixed(8);

  const age = calculateAge();

  return (
    <>
      <div class="standardBlock">
        <h1 style="color: var(--red)" class="nob not">Hi!</h1>

        <p class="not">
          My name is Derek Verduijn, aka Definitely Not A Dolphin or Killioiden
          Kaa. I am a {/* ToDo: make this update automatically */}
          {age}{" "}
          y/o computer and math enthusiast from The Netherlands studying Applied
          Mathematics @ TUDelft. Other interests include Finnish and chess.
        </p>

        <h1 style="color: var(--red)" class="nob not">Stuff I do</h1>
        <p class="nob not">
          Currently I am working on Funktio and Geen-Dolfijn.
        </p>

        <p>
          To busy skateboarding on the learning curve to write code that doesn't
          suck.
        </p>

        <h3 style="color: var(--blue)" class="nob not">Hackatime</h3>

        <HackatimeStats />
      </div>
    </>
  );
});
