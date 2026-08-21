import generalData from "@/assets/generalData.json" with { type: "json" };
import { define } from "../utils.ts";

function LinkTo({ url }: { url: string }) {
  return (
    <a href={url}>
      <div class="button1">
        <p class="nob not">{url}</p>
      </div>
    </a>
  );
}

export default define.page(function App({ Component }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>geen-dolfijn</title>
      </head>
      <body>
        <div class="centerer">
          <div class="fillerElement" />

          <div class="containerMain">
            <Component />

            <div class="containerButtons">
              {generalData.pages.map((url) =>
                // deno-lint-ignore jsx-key
                <LinkTo {...{ url }} />
              )}
            </div>

            <div class="mentions">
              <h3>My frend</h3>

              {generalData.friends.map((friend) => (
                <a href={friend.link}>
                  <img
                    class="mentionspfp"
                    src={`https://avatars.githubusercontent.com/u/${friend.pfpId}?v=4`}
                    alt={`${friend.name}'s pfp`}
                  />
                </a>
              ))}
            </div>
          </div>

          <div class="fillerElement" />
        </div>
      </body>
    </html>
  );
});
