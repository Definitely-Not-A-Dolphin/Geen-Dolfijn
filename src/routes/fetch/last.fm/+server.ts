import { json } from "@sveltejs/kit";
import type { LastFMData, LastFMTrack } from "$lib/customTypes.ts";
import { secretData } from "$lib/secrets.ts";

export async function GET(): Promise<Response> {
  try {
    const response: Response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${secretData.lastfmUser}&api_key=${secretData.lastfmkey}&format=json&limit=1`,
    );

    if (!response.ok) return json(false);

    const data: LastFMData = await response.json();

    const tracks: LastFMTrack[] = data.recenttracks.track;
    if (
      tracks.length === 0 ||
      !tracks[0] ||
      !tracks[0]["@attr"] ||
      !tracks[0]["@attr"].nowplaying
    ) return json(true);

    const currentTrack: LastFMTrack = tracks[0];

    const image: string = currentTrack.image[2]["#text"];
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
