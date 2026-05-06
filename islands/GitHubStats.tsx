import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import type { Repository } from "@/lib/customTypes.ts";
import generalData from "@/assets/generalData.json" with { type: "json" };

function getColor(language: string): string {
  const foundLanguage = Object
    .keys(generalData.languageColors)
    .find((languages) => language === languages);

  if (foundLanguage) {
    const [red, green, blue] = foundLanguage[1];
    return `rgb(${red},${green},${blue})`;
  }

  return "white";
}

export default function GithubStats({ repoID }: { repoID: number }) {
  const stats = useSignal<Repository | null>(null);
  const error = useSignal<string | null>(null);

  useEffect(() => {
    fetch(`/api/github?repoID=${repoID}`)
      .then((r) => r.json())
      .then((data) => stats.value = data)
      .catch((e) => error.value = e.message);
  }, []);

  if (error.value) return <p>Failed to load stats.</p>;
  if (!stats.value) return <p>Loading GitHub stats...</p>;

  console.log("wiufbweifubwifub");

  const project = stats.value;
  const stars = Math.min(project.stargazerCount, 6);

  return (
    <>
      <h3 class="halfb not">
        <img
          alt="owner_avatar_url"
          src={project.owner.avatarUrl}
          style="height: 20px; border-radius: 10px;"
        />
        {project.owner.login}/<br />
        <a href={project.url}>
          {project.name}
        </a>
      </h3>

      <p class="halfb halft">
        {Array(stars).map(() => (
          <svg
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            style="fill: #e3b341"
          >
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z">
            </path>
          </svg>
        ))}
        {project.stargazerCount > 6 ? "+" : ""}
      </p>

      <p class="nob not">Languages</p>
      <ul class="not" style="font-size: 16px;">
        {Object.entries(project.languages).map(([language, percent]) => (
          <li>
            {percent}%{" "}
            <span style={`color: ${getColor(language)}`}>{language}</span>
          </li>
        ))}
      </ul>

      <div style="
        display: flex;
        border-radius: 5px;
        overflow: hidden;
      ">
        {Object.entries(project.languages).map(([language, percent]) => (
          <div
            style={`
              width: ${2.304 * Number(percent)}px;
              height: 12px;
              background-color: ${getColor(language)}
          `}
          >
          </div>
        ))}
      </div>
    </>
  );
}
