import type { LastFMData } from "@/lib/customTypes.ts";
import { define } from "../../utils.ts";

const LASTFMKEY = Deno.env.get("LASTFMKEY");
const LASTFMUSER = Deno.env.get("LASTFMUSER");

export const handler = define.handlers({
  async GET() {
    if (!(LASTFMKEY && LASTFMUSER)) {
      console.error("\x1b[34mIncomplete dotenv file!\x1b[0m");
      console.assert(
        Boolean(LASTFMKEY),
        "\x1b[34mMissing LASTFMKEY\x1b[0m",
      );
      console.assert(
        Boolean(LASTFMUSER),
        "\x1b[34mMissing LASTFMUSER\x1b[0m",
      );
      return Response.json(false);
    }

    const lastFMResponse = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFMUSER}&api_key=${LASTFMKEY}&format=json&limit=1`,
    );

    const responseData: LastFMData = await lastFMResponse.json();
    const recentTracks = responseData.recenttracks.track;

    if (!recentTracks[0]["@attr"]?.nowplaying) return Response.json(true);

    const currentTrack = recentTracks[0];
    const image = currentTrack.image[2]["#text"];

    return Response.json({
      artist: currentTrack.artist["#text"],
      name: currentTrack.name,
      album: currentTrack.album["#text"],
      image: image === ""
        ? "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png"
        : image,
      url: currentTrack.url,
    });
  },
});
