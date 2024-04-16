import { GUI, UIComponent } from "../../src/lib/render";
import { MainButton } from "./components/MainButton";

export class MainMenuUI extends GUI {
  private buttonNewGame: MainButton = new MainButton(
    "newGameButton",
    "Novo Jogo",
  );

  private buttonQuitGame: MainButton = new MainButton("buttonQuitGame", "Sair");

  private buttonLoadGame: MainButton = new MainButton(
    "buttonLoadGame",
    "Carregar Jogo",
  );

  private frame: UIComponent = new UIComponent({
    name: "MainMenuFrame",
    tag: "div",
  });

  constructor() {
    super("MainMenuUI");

    this.buttonNewGame.element.onclick = this.newGameButtonOnClick;

    this.buttonNewGame.setStyle = {
      bottom: "50%",
      left: "50%",
      transform: "translate(-50%)",
    };

    this.buttonLoadGame.setStyle = {
      bottom: "30%",
      left: "50%",
      transform: "translate(-50%)",
    };

    this.buttonQuitGame.setStyle = {
      bottom: "10%",
      left: "50%",
      transform: "translate(-50%)",
    };

    this.frame.setClass = "main-menu-frame";
    this.frame.addChildren(this.buttonNewGame.element);
    this.frame.addChildren(this.buttonLoadGame.element);
    this.frame.addChildren(this.buttonQuitGame.element);

    this.addChildren(this.frame.element);
  }

  public newGameButtonOnClick = () => {
    console.log("asdasdasdasdasdasas");
  };
}

