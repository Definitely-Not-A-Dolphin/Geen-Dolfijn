import type { Track } from "@/lib/customTypes.ts";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import hornetRunning from "/HornetRunning.gif";

export default function LastFMStats() {
  const stats = useSignal<Track | boolean | null>(null);
  const error = useSignal<string | null>(null);

  useEffect(() => {
    fetch(`/api/lastfm`)
      .then((r) => r.json())
      .then((data) => stats.value = data)
      .catch((e) => error.value = e.message);
  }, []);

  if (error.value) return <p>Failed to load stats. Error: {error.value}</p>;
  if (stats.value === null) {
    return (
      <div style="display: flex; gap: 10px; justify-content: space-between;">
        <div>
          <h3 class="nob not" style="color: var(--mathcolor);">Last.fm</h3>
          <p class="not">Waiting last.fm data...</p>
        </div>
        <div>
          <img
            src={hornetRunning}
            alt="Hornet Running"
            style="height: 140px;"
          />
        </div>
      </div>
    );
  }

  if (stats.value === false) {
    return (
      <>
        <h3 class="nob not" style="color: var(--mathcolor);">Last.fm</h3>
        <p class="not">Something went wrong while fetching Last.fm data D:</p>
      </>
    );
  }

  if (stats.value === true) {
    return (
      <>
        <h3 class="nob not" style="color: var(--mathcolor);">Last.fm</h3>
        <p class="not">I am not currently listening to any music</p>
      </>
    );
  }

  const trackData = stats.value;

  return (
    <div style="display: flex; gap: 10px; justify-content: space-between;">
      <div>
        <h3 class="nob not" style="color: var(--mathcolor);">Last.fm</h3>
        <p class="not">
          Currently listening to <a href={trackData.url}>{trackData.name}</a>
          {" "}
          from {trackData.album} by {trackData.artist}
        </p>
      </div>
      <div>
        <img
          style="border-radius: 15px; height: 120px;"
          alt="album cover"
          src={trackData.image}
        />
      </div>
    </div>
  );
}
