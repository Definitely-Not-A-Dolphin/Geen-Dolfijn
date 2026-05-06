import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import type { HackaTimeToday } from "@/lib/customTypes.ts";

export default function HackatimeStats() {
  const stats = useSignal<HackaTimeToday | null>(null);
  const error = useSignal<string | null>(null);

  useEffect(() => {
    fetch(`/api/hackatime`)
      .then((r) => r.json())
      .then((data) => stats.value = data)
      .catch((e) => error.value = e.message);
  }, []);

  if (error.value) return <p>Failed to load stats. Error: {error.value}</p>;
  if (!stats.value) return <p>Loading Hackatime stats...</p>;

  const hackatimeData = stats.value;
  const grandTotal = hackatimeData.data.grand_total;

  return (
    <p>
      Today I have logged {grandTotal.total_seconds}{" "}
      seconds of coding, which is equal to {" "}
      {grandTotal.text === "Start coding to track your time"
        ? "nothing :/"
        : `${grandTotal.text}!`}
    </p>
  );
}
