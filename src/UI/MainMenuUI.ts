import {
  gameEvents,
  GUI,
  IUIConstructor,
  UIComponent,
} from "../../src/lib/render";
import { GAME_EVENTS } from "../../src/statics/eventlist";
import { MainButton } from "./components/MainButton";

const UI_NAME = "MainMenuUI";

export class MainMenuUI extends GUI {
  private titleContainer: UIComponent = new UIComponent({
    id: "TitleContainer",
    tag: "div",
  });
  private buttonNewGame: MainButton = new MainButton(
    "NewGameButton",
    "Novo Jogo",
  );
  private buttonQuitGame: MainButton = new MainButton("ButtonQuitGame", "Sair");
  private buttonLoadGame: MainButton = new MainButton(
    "ButtonLoadGame",
    "Carregar Jogo",
  );
  private guiFrame: UIComponent = new UIComponent({
    id: "MainMenuFrame",
    tag: "div",
  });

  constructor(private uiAssets?: IUIConstructor) {
    super(UI_NAME);

    this.titleContainer.addChildren(
      this.uiAssets.sceneResources["title_logo"].image,
    );

    this.guiFrame.addChildren(this.titleContainer.element);

    this.guiFrame.addChildren(this.buttonNewGame.element);
    this.guiFrame.addChildren(this.buttonLoadGame.element);
    this.guiFrame.addChildren(this.buttonQuitGame.element);

    this.buttonNewGame.element.onclick = this.newGameButtonOnClick;
    this.buttonLoadGame.element.onclick = this.loadGameButtonOnClick;
    this.buttonQuitGame.element.onclick = this.quitGameButtonOnClick;

    this.addChildren(this.guiFrame.element);
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

