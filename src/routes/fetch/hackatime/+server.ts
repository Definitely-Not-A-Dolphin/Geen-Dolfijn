import { json } from "@sveltejs/kit";
import { secretData } from "$lib/secrets.ts";

export async function GET(): Promise<Response> {
  const response = await fetch(
    "https://hackatime.hackclub.com/api/hackatime/v1/users/5619/statusbar/today",
    {
      method: "GET",
      headers: {
        Authorization: secretData.hackatimeAuth,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Error response ${response.text}`);
  }

  const data = await response.json();
  return json(data);
}
