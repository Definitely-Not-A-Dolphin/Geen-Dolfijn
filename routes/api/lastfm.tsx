import type { LastFMData } from "@/lib/types.ts";
import { define } from "@/utils.ts";

const LASTFMKEY = Deno.env.get("LASTFMKEY");
const LASTFMUSER = Deno.env.get("LASTFMUSER");

export const handler = define.handlers({
  async GET() {
    if (!LASTFMKEY) {
      console.error("Incomplete dotenv! Missing \x1b[34mLASTFMKEY\x1b[0m");
      throw new Error(
        "Server error: missing last.fm auth key. not your fault, sorry :(",
      );
    }
    if (!LASTFMKEY) {
      console.error("Incomplete dotenv! Missing \x1b[34mLASTFMUSER\x1b[0m");
      throw new Error(
        "Server error: missing my last.fm username. not your fault, sorry :(",
      );
    }

    const lastFMResponse = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFMUSER}&api_key=${LASTFMKEY}&format=json&limit=1`,
    );

    const responseData = await lastFMResponse.json() as LastFMData;
    const recentTracks = responseData.recenttracks.track;

    if (!recentTracks[0]["@attr"]?.nowplaying) {
      return Response.json(undefined);
    }

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
