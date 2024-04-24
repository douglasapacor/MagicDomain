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

  constructor(private uiAssets?: IUIConstructor) {
    super(UI_NAME);
    this.gameNameInput.setAttributes = { type: "text" };

    this.newGameFrame.addChildren(this.gameNameInput.element);

    this.addChildren(this.newGameFrame.element);
  }
}

