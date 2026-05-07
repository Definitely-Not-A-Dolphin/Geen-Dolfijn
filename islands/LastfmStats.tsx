import type { Track } from "@/lib/customTypes.ts";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import hornetRunning from "/HornetRunning.gif";

export default function LastFMStats() {
  const trackData = useSignal<Track | boolean | null>(null);
  const error = useSignal<string | null>(null);

  useEffect(() => {
    fetch(`/api/lastfm`)
      .then((r) => r.json())
      .then((data) => trackData.value = data)
      .catch((e) => error.value = e.message);
  }, []);

  if (error.value) return <p>Failed to load stats. Error: {error.value}</p>;
  if (trackData.value === null) {
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

  if (trackData.value === false) {
    return (
      <>
        <h3 class="nob not" style="color: var(--mathcolor);">Last.fm</h3>
        <p class="not">Something went wrong while fetching Last.fm data D:</p>
      </>
    );
  }

  if (trackData.value === true) {
    return (
      <>
        <h3 class="nob not" style="color: var(--mathcolor);">Last.fm</h3>
        <p class="not">I am not currently listening to any music</p>
      </>
    );
  }

  return (
    <div style="display: flex; gap: 10px; justify-content: space-between;">
      <div>
        <h3 class="nob not" style="color: var(--mathcolor);">Last.fm</h3>
        <p class="not">
          Currently listening to{" "}
          <a href={trackData.value.url}>{trackData.name}</a> from{" "}
          {trackData.value.album} by {trackData.value.artist}
        </p>
      </div>
      <div>
        <img
          style="border-radius: 15px; height: 120px;"
          alt="Album Cover"
          src={trackData.value.image}
        />
      </div>
    </div>
  );
}
