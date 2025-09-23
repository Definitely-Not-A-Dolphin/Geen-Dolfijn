import { Octokit } from "octokit";
import type {
  Commit,
  GitHubCommit,
  GitHubRepository,
  HackaTimeToday,
  Language,
  LastFMData,
  LastFMTrack,
  OctokitResponse,
  Repository,
  Track,
} from "./customTypes.ts";
import secretData from "./secretData.json" with { type: "json" };

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function arrayChecker<T>(array: T[], element: T): boolean {
  for (let value in array) {
    if (value === element) {
      return true;
    }
  }

  return false;
}

export async function getRepoData(repoID: number): Promise<Repository> {
  // Create octokit auth
  const octokit: Octokit = new Octokit({
    auth: secretData.token,
  });

  // Request all the repos
  const repoData: OctokitResponse<GitHubRepository> = await octokit.request(
    "GET /repositories/{repoID}",
    {
      repoID: repoID,
    },
  );

  console.log("\x1b[44m > \x1b[0m Fetch Log");
  console.log(repoData.headers);

  // Get the languages
  const rawLanguageData: OctokitResponse<Language[]> = await octokit
    .request("GET /{url}", {
      url: repoData.data.languages_url,
    });

  console.log(
    "\x1b[43m > \x1b[0m Fetch Log Languages",
  );
  console.log(rawLanguageData.headers);

  // Aantal characters
  let totalChar: number = 0;
  for (const language of Object.entries(rawLanguageData.data)) {
    totalChar += Number(language[1]);
  }

  let languageData: { [language: string]: number } = {};
  for (const language of Object.entries(rawLanguageData.data)) {
    const thing: number = Math.floor(Number(language[1]) / totalChar * 1000) /
      10;
    if (thing === 0) {
      continue; // Equivalent of break as long as github doesn't switch the descending order of languages
    }
    languageData[language[0]] = thing;
  }

  const returnData: Repository = {
    id: repoData.data.id,
    fullName: repoData.data.full_name,
    name: repoData.data.name,
    ownerLogin: repoData.data.owner.login,
    description: repoData.data.description,
    url: repoData.data.html_url,
    languages: languageData,
    license: repoData.data.license
      ? {
        name: repoData.data.license.name,
        url: repoData.data.license.url,
      }
      : undefined,
  };

  console.log("\x1b[102m > \x1b[0m Returned Data");
  console.log(returnData);
  return returnData;
}

export async function getLatestCommits(repoID: number): Promise<Commit[]> {
  const octokit: Octokit = new Octokit({
    auth: secretData.token,
  });

  const commitData: OctokitResponse<GitHubCommit[]> = await octokit.request(
    "GET /repositories/{repoID}/commits",
    {
      repoID: repoID,
    },
  );

  const returnData: Commit[] = [];

  for (let i = 0; i <= 2; i++) {
    const thing = commitData.data[i];
    returnData.push({
      message: thing.commit.message,
      author: thing.author.login,
      html_url: thing.html_url,
      author_html_url: thing.author.html_url,
      author_avatar_url: thing.author.avatar_url,
    });
  }

  return returnData;
}

export function getIndexFromID(array: Repository[], id: number): number {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      return i;
    }
  }
  return -1;
}

export async function getHackatime(): Promise<HackaTimeToday> {
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

  return await response.json();
}

export async function getCurrentTrack(): Promise<Track | boolean> {
  try {
    const response: Response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=Yologekkie08&api_key=${secretData.lastfmkey}&format=json&limit=1`,
    );

    if (!response.ok) {
      return false;
    }

    const data: LastFMData = await response.json();

    const tracks: LastFMTrack[] = data.recenttracks.track;
    if (
      tracks.length === 0 ||
      !tracks[0] ||
      !tracks[0]["@attr"] ||
      !tracks[0]["@attr"].nowplaying
    ) {
      return true;
    }

    const currentTrack: LastFMTrack = tracks[0];
    if (secretData.forbiddenSongs.includes(currentTrack.name)) {
      return true;
    }

    const image: string = currentTrack.image[2]["#text"];
    return {
      artist: currentTrack.artist["#text"],
      name: currentTrack.name,
      album: currentTrack.album["#text"],
      image: image === ""
        ? "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png"
        : image,
      url: currentTrack.url,
    };
  } catch (error) {
    console.error(error);
    return false;
  }
}
