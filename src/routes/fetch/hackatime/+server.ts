import { HACKATIMEAUTH } from "$env/static/private";
import { json } from "@sveltejs/kit";
import type { HackaTimeToday } from "../../../lib/customTypes.ts";

export async function GET(): Promise<Response> {
  if (!HACKATIMEAUTH) {
    console.error("Incomplete dotenv! Missing \x1b[34mHACKATIMEAUTH\x1b[0m");
    return json(false);
  }
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
