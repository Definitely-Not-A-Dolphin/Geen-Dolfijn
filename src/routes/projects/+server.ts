import { json } from "@sveltejs/kit";
import { getRepoData } from "$lib/utils.ts";
import generalData from "$lib/generalData.json" with { type: "json" };

export async function GET(): Promise<Response> {
  const bestNumber = await getRepoData(generalData.repoIDs);
  return json(bestNumber);
}
