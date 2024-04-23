import { GUI, IUIConstructor } from "../../src/lib/render";

const UI_NAME = "LoadGameUI";

export class LoadGameUI extends GUI {
  constructor(private uiAssets?: IUIConstructor) {
    super(UI_NAME);
  }
}

