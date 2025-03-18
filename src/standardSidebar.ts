class Navbar extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.render()
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
            <h1>
              Check Out:
            </h1>
          </div>

          <div class="containerSidebarButtons">
            <div class="buttons">
              <button class="button1" onclick="linkToProj()">My Projects</button>
            </div>
            <div class="buttons">
              <button class="button1" onclick="linkToDesm()">Desmos Gallery</button>
            </div>
            <div class="buttons">
              <button class="button1" onclick="linkToSkil()">My Skills</button>
            </div>
            <div class="buttons">
              <button class="button1" onclick="linkToOpin()">Opinions</button>
            </div>
            <div class="buttons">
              <button class="button1" onclick="linkToReco()">Interesting Stuff</button>
            </div>
            <div class="buttons">
              <button class="button1" onclick="linkToThou()">Random Thoughts</button>
            </div>
            <div class="buttons">
              <button class="button1" onclick="linkToToDo()">To Do List</button>
            </div>
            <div class="button">
              <button class="button1" onclick="linkToHome()">Home</button>
            </div>
          </div>

        <img class="item sizzle" src="../images/S_I_Z_Z_L_E.jpg" alt="picture of my cat">

        </div>
      </nav>
      `
  }
  // als je hier wat javascript wilt doen met je navbar enz dan kan je `this.shadowRoot.querySelector` enz doen.
}

customElements.define("side-bar", Navbar)