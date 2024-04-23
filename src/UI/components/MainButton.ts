import { UIComponent } from "../../../src/lib/render";

export class MainButton extends UIComponent {
  private ancor: HTMLAnchorElement = document.createElement("a");

  constructor(name: string, text: string) {
    super({ name, tag: "div" });

    this.setClass = "button";
    this.ancor.innerText = text;
    this.addChildren(this.ancor);
  }
}

