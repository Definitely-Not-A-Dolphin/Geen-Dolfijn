import generalData from "@/assets/generalData.json" with { type: "json" };
import { define } from "../utils.ts";

function LinkTo(url: string) {
  return (
    <>
      <a href={url}>{url}</a>
      {" "}
    </>
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

          <div class="mainContainer">
            <div class="standardBlock">
              <div class="containerButtons">
                {generalData.pages.map((url) => LinkTo(url))}
              </div>
            </div>

            <Component />

            <div class="mentions">
              <h3>My friends</h3>

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
