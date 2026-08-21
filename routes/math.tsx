import { define } from "@/utils.ts";

const entries = [
  {
    title: "The Button Analysis",
    discription: "I once saw a game on steam called \"The Button\", and I thought that it had some interesting math going with it, so I decided to graph how the underlying probabilities work.",
    link: "LINK",
  },
  {
    title: "The Button Analysis",
    discription: "DISCRIPTION",
    link: "LINK",
  },
] as const;

export default define.page(function Home() {
  return (
    <>
      <div class="header">
        <h1 style="color: var(--projectcolor)">Mathematics</h1>
      </div>

      {entries.map((entry) => (
        <div class="standardBlock mathBlock">
          <h1>{entry.title}</h1>
          <p>{entry.discription}</p>
          <a>{entry.link}</a>
        </div>
      ))}
    </>
  );
});
