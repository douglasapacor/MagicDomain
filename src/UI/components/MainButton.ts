import { UIComponent } from "../../../src/lib/render";

export class MainButton extends UIComponent<"div"> {
  private ancor: HTMLAnchorElement = document.createElement("a");

  constructor(id: string, text: string) {
    super(id, "div");

    this.setClass = "button";
    this.ancor.innerText = text;
    this.addChildren(this.ancor);
  }
}

