import { Builder } from "./Builder";

export class UIComponent {
  protected element: HTMLElement;
  private parent?: UIComponent;

  constructor(
    tagName?: keyof HTMLElementTagNameMap,
    className?: string,
    parent?: UIComponent,
  ) {
    if (tagName)
      this.element = Builder.createElement({
        tagName,
      });
    else
      this.element = Builder.createElement({
        tagName: "div",
      });

    if (className) this.element.className = className;

    this.parent = parent;
  }

  public addToParent(parent?: UIComponent): void {
    if (parent) parent.element.appendChild(this.element);
    else if (this.parent) this.parent.element.appendChild(this.element);
    else document.body.appendChild(this.element);
  }

  public show(): void {
    this.element.style.display = "block";
  }

  public hide(): void {
    this.element.style.display = "none";
  }

  public get getElement(): HTMLElement {
    return this.element;
  }

  public setStyle(style: unknown): void {
    Builder.setStyle(this.element, style);
  }

  public set className(className: string) {
    this.element.className = className;

    Builder.setAttribute({
      element: this.element,
      params: { classes: className },
    });
  }
}
