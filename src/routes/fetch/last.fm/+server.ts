import { json } from "@sveltejs/kit";
import type { LastFMData, LastFMTrack } from "$lib/customTypes.ts";
import { LASTFMKEY, LASTFMUSER } from "$env/static/private";

export async function GET(): Promise<Response> {
  if (!(LASTFMKEY && LASTFMUSER)) {
    console.error("\x1b[34mIncomplete dotenv file!\x1b[0m");
    console.assert(Boolean(LASTFMKEY), "\x1b[34mMissing LASTFMKEY\x1b[0m");
    console.assert(Boolean(LASTFMUSER), "\x1b[34mMissing LASTFMUSER\x1b[0m");
    return json(false);
  }

  try {
    const lastFMResponse = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFMUSER}&api_key=${LASTFMKEY}&format=json&limit=1`,
    );

    if (!lastFMResponse.ok) return json(false);

    const responseData: LastFMData = await lastFMResponse.json();
    const recentTracks: LastFMTrack[] = responseData.recenttracks.track;

    if (
      recentTracks.length === 0 ||
      !recentTracks[0] ||
      !recentTracks[0]["@attr"] ||
      !recentTracks[0]["@attr"].nowplaying
    ) return json(true);

    const currentTrack: LastFMTrack = recentTracks[0];

    const image = currentTrack.image[2]["#text"];
    return json({
      artist: currentTrack.artist["#text"],
      name: currentTrack.name,
      album: currentTrack.album["#text"],
      image: image === ""
        ? "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png"
        : image,
      url: currentTrack.url,
    });
  } catch (error) {
    console.error(error);
    return json(false);
  }
}
