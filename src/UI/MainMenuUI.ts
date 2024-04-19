import {
  gameEvents,
  GUI,
  IUIConstructor,
  UIComponent,
} from "../../src/lib/render";
import { GAME_EVENTS } from "../../src/statics/eventlist";
import { MainButton } from "./components/MainButton";

export class MainMenuUI extends GUI {
  private titleContainer: UIComponent = new UIComponent({
    name: "titleContainer",
    tag: "div",
  });
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

  constructor(private uiAssets?: IUIConstructor) {
    super("MainMenuUI");

    this.titleContainer.setClass = "ui-title";
    this.buttonNewGame.element.onclick = this.newGameButtonOnClick;
    this.buttonLoadGame.element.onclick = this.loadGameButtonOnClick;
    this.buttonQuitGame.element.onclick = this.quitGameButtonOnClick;
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
    this.titleContainer.addChildren(
      this.uiAssets.sceneResources["title_logo"].image,
    );
    this.frame.addChildren(this.titleContainer.element);
    this.frame.addChildren(this.buttonNewGame.element);
    this.frame.addChildren(this.buttonLoadGame.element);
    this.frame.addChildren(this.buttonQuitGame.element);

    this.addChildren(this.frame.element);
  }

  public newGameButtonOnClick = () => {
    if (this.uiAssets)
      if (this.uiAssets.sceneSounds)
        this.uiAssets.sceneSounds["button-pop"].play();

    gameEvents.emit(GAME_EVENTS.CHANGE_SCENE, "NewGameScene");
  };

  public loadGameButtonOnClick = () => {
    if (this.uiAssets)
      if (this.uiAssets.sceneSounds)
        this.uiAssets.sceneSounds["button-pop"].play();

    gameEvents.emit(GAME_EVENTS.CHANGE_SCENE, "LoadGameScene");
  };

  public quitGameButtonOnClick = () => {
    if (this.uiAssets)
      if (this.uiAssets.sceneSounds)
        this.uiAssets.sceneSounds["button-pop"].play();

    window.bridge.send(GAME_EVENTS.QUIT_APP);
  };
}

