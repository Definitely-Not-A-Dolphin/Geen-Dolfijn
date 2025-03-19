const urls: { name: string; url: string }[] = [
  {
    name: "My Projects",
    url: "/my-projects/",
  },
  {
    name: "Desmos Gallery",
    url: "/desmos-gallery/",
  },
  {
    name: "My Skills",
    url: "/my-skills/",
  },
  {
    name: "Opinions",
    url: "/opinions/",
  },
  {
    name: "Interesting Stuff",
    url: "/interesting-stuff/",
  },
  {
    name: "Random Thoughts",
    url: "/random-thoughts/",
  },
  {
    name: "To Do List",
    url: "/to-do-list/",
  },
  {
    name: "Home",
    url: "/",
  },
];

class Navbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
  <style>
    .containerSidebar {
      gap: 20px;
      flex: none;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .containerSidebarButtons {
      gap: 10px;
      display: flex;
      flex-direction: column;
    }

    .button1 {
      font-family: Georgia, serif;
      background-color: rgb(25, 25, 25);
      border: none;
      width: 220px;
      height: 40px;
      border-radius: 15px;
      font-size: 18px;
      color: rgb(0, 200, 200);
      display: inline-block; /* hierdoor werken width en height */
      text-align: center; /* text center horizontaal */
      line-height: 40px; /* zorgt ervoor dat text in midden verticaal is, verander dit als je height veranderd*/
      text-decoration: none; /* geen underline */
    }

    .sizzle {
      width: 220px;
      border-radius: 20px;
    }

    .CheckOut {
      border-radius: 15px;
      width: 200px;
      text-align: center;
      color: white;
      padding: 10px;
      background-color: rgb(25, 25, 25);
    }
  </style>

  <nav>
    <div class="containerSidebar">
      <div class="CheckOut">
        <h1>Check Out:</h1>
      </div>

      <div class="containerSidebarButtons"></div>

      <img
        class="item sizzle"
        src="../images/S_I_Z_Z_L_E.jpg"
        alt="picture of my cat"
      />
    </div>
  </nav>
      `;

    const containerSidebarButtons = this.shadowRoot!.querySelector(
      ".containerSidebarButtons",
    )!; // Div waar alle buttons inzitten
    for (let url of urls) {
      // Loop over alle linkjes
      const link = document.createElement("a"); // Maak een <a> aan
      link.classList.add("button1"); // Voeg class toe
      link.innerText = url.name; // Zet tekst
      link.href = url.url; // Zet url

      const buttonContainer = document.createElement("div"); // Maak container voor <a>
      buttonContainer.classList.add("buttons"); // voeg class toe
      buttonContainer.append(link); // voeg <a> toe aan <div>

      containerSidebarButtons.append(buttonContainer); // Voeg <div> toe aan navbar
    }
  }
}

customElements.define("side-bar", Navbar);
