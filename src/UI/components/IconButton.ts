import { Icon, UIComponent } from "../../lib/render";

export class IconButton extends UIComponent {
  constructor(
    id: string,
    private icon: Icon,
  ) {
    super({ id, tag: "div" });
    this.setClass = "icon-button";
    this.addChildren(this.icon.svg);
  }
}

