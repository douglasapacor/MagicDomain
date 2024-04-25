import { GUI, IUIConstructor, UIComponent } from "../../src/lib/render";

const UI_NAME = "NewGameUI";

export class NewGameUI extends GUI {
  private newGameFrame: UIComponent = new UIComponent({
    id: "NewGameFrame",
    tag: "div",
  });

  private gameNameInput: UIComponent = new UIComponent({
    id: "GameNameInput",
    tag: "input",
  });

  private gameNameLabel: UIComponent = new UIComponent({
    id: "GameNameLabel",
    tag: "label",
  });

  private preFrame: UIComponent = new UIComponent({
    id: "PreFrame",
    tag: "div",
  });

  constructor(private uiAssets?: IUIConstructor) {
    super(UI_NAME);
    this.gameNameInput.setAttributes = { type: "text" };
    this.gameNameInput.setAttributes = { name: "gameName" };

    this.gameNameLabel.setAttributes = { for: "gameName" };
    this.gameNameLabel.innerText = "Nome do Jogo";

    this.newGameFrame.addChildren(this.gameNameLabel.element);
    this.newGameFrame.addChildren(this.gameNameInput.element);
    this.newGameFrame.addChildren(this.preFrame.element);

    this.addChildren(this.newGameFrame.element);
  }
}

