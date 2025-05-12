const urls: { name: string; url: string; onHome?: boolean }[] = [
  // ^^ onHome is an optional parameter, so that we can hide certain links on the homepage
  {
    name: "Projects",
    url: "/projects.html",
  },
  {
    name: "Desmos Gallery",
    url: "/desmos-gallery.html",
  },
  /* {
    name: "My Skills",
    url: "/my-skills.html",
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
  }, */
  {
    name: "Home",
    url: "/",
    onHome: false,
  },
];

class Navbar extends HTMLElement {
  #isHome: boolean;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();

    this.#isHome = false;
  }

  static observedAttributes = ["ishome"]; // Set the attributes you can set in the html

  attributeChangedCallback(name: string, _: string, newValue: string) {
    console.log(name, newValue);
    // This function gets called when an attribute changes
    if (name === "ishome" && newValue === "true") {
      // We set the isHome (private) variable to true
      this.#isHome = true;
    }

    this.render(); // Re-render the component
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

      ${
        /* Only add the image if we're not on the homepage, 
           Here's an explainer for the syntax 
           https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator 
        */
        this.#isHome
          ? ""
          : `
        <img
          class="item sizzle"
          src="../images/S_I_Z_Z_L_E.jpg"
          alt="picture of my cat"
        />
      `
      }
    </div>
  </nav>
      `;

    const containerSidebarButtons = this.shadowRoot!.querySelector(
      ".containerSidebarButtons",
    )!; // Div where we'll put the buttons
    for (let url of urls) {
      // Loop over the links
      if (url.onHome === false && this.#isHome) continue; // Don't add this link if we're on the homepage.

      const link = document.createElement("a"); // Create a <a>
      link.classList.add("button1"); // Add a class
      link.innerText = url.name; // Add some text
      link.href = url.url; // Set the url

      const buttonContainer = document.createElement("div"); // Make a <div> for the <a>
      buttonContainer.classList.add("buttons"); // Add class
      buttonContainer.append(link); // Add <a> in <div>

      containerSidebarButtons.append(buttonContainer); // Add <div> in navbar
    }
  }
}

customElements.define("side-bar", Navbar);
