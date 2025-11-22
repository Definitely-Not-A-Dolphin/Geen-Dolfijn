import { HACKATIMEAUTH } from "$env/static/private";
import type { HackaTimeToday } from "../../../lib/customTypes.ts";
import { json } from "@sveltejs/kit";

export async function GET(): Promise<Response> {
  const hackatimeResponse = await fetch(
    "https://hackatime.hackclub.com/api/hackatime/v1/users/5619/statusbar/today",
    {
      method: "GET",
      headers: {
        Authorization: HACKATIMEAUTH,
      },
    },
  );

  if (!hackatimeResponse.ok) {
    throw new Error(`Error response ${hackatimeResponse.text}`);
  }

  const data: HackaTimeToday = await hackatimeResponse.json();
  return json(data);
}
