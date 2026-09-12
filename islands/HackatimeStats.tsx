import type { HackaTimeToday } from "@/lib/types.ts";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export default function HackatimeStats() {
  const stats = useSignal<HackaTimeToday | null>(null);
  const error = useSignal<string | null>(null);

  useEffect(() => {
    fetch("/api/hackatime")
      .then((r) => r.json())
      .then((data) => stats.value = data)
      .catch((e) => error.value = e.message);
  }, []);

  return error.value
    ? (
      <p>
        <strong>Failed to load stats. Error:</strong> {error.value}
      </p>
    )
    : !stats.value
    ? <p>Loading Hackatime stats...</p>
    : (
      <p>
        Today I have logged {stats.value.data.grand_total.total_seconds}{" "}
        seconds of coding, which is equal to{"  "}
        {stats.value.data.grand_total.text === "Start coding to track your time"
          ? "nothing :/"
          : `${stats.value.data.grand_total.text}!`}
      </p>
    );
}
