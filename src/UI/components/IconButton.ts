import { Icon, UIComponent } from "../../lib/render";

export class IconButton extends UIComponent<"div"> {
  constructor(
    id: string,
    private icon: Icon,
  ) {
    super(id, "div");
    this.setClass = "icon-button";
    this.addChildren(this.icon.svg);
  }
}

