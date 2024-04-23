import { GUI, IUIConstructor } from "../../src/lib/render";

const UI_NAME = "NewGameUI";

export class NewGameUI extends GUI {
  constructor(private uiAssets?: IUIConstructor) {
    super(UI_NAME);
  }
}

