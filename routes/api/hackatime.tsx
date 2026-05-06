import type { HackaTimeToday } from "@/lib/customTypes.ts";
import { define } from "../../utils.ts";

const HACKATIMEAUTH = Deno.env.get("HACKATIMEAUTH");

export const handler = define.handlers({
  async GET() {
    if (!HACKATIMEAUTH) {
      console.error("Incomplete dotenv! Missing \x1b[34mHACKATIMEAUTH\x1b[0m");
      throw new Error(`Server error: no hackatime auth :(`);
    }

    const hackatimeResponse = await fetch(
      "https://hackatime.hackclub.com/api/hackatime/v1/users/5619/statusbar/today",
      {
        method: "GET",
        headers: {
          Authorization: HACKATIMEAUTH!,
        },
      },
    );

    const data: HackaTimeToday = await hackatimeResponse.json();

    return Response.json(data);
  },
});
