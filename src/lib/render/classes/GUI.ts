import { IUIComponentConstructor } from "./Interfaces/IUIComponentConstructor";
import { UIComponent } from "./UIComponent";

export class GUI extends UIComponent {
  private uiComponents: Record<string, UIComponent> = {};
  constructor(params: IUIComponentConstructor) {
    super(params);
  }
}

