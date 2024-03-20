export class UIComponent {
  protected element: HTMLElement;
  private parent?: UIComponent;

  constructor(parent?: UIComponent) {
    this.element = document.createElement("div");
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

  public getElement(): HTMLElement {
    return this.element;
  }
}
