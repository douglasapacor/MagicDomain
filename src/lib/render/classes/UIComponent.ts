import { IHtmlAttributes } from "./Interfaces/IHtmlAttributes";

export class UIComponent {
  private _element: HTMLElement;

  constructor(params: { id: string; tag: keyof HTMLElementTagNameMap }) {
    this._element = document.createElement(params.tag);
    this._element.setAttribute("id", params.id);
  }

  public addChildren(children: HTMLElement | SVGSVGElement): void {
    this._element.appendChild(children);
  }

  public show(): void {
    this.element.style.display = "block";
  }

  public hide(): void {
    this._element.style.display = "none";
  }

  public get element(): HTMLElement {
    return this._element;
  }

  public set setAttributes(attributes: IHtmlAttributes) {
    for (const [key, value] of Object.entries(attributes)) {
      this._element.setAttribute(key, value);
    }
  }

  public set setClass(className: string) {
    this._element.className = className;
  }

  public set innerText(text: string) {
    this._element.innerText = text;
  }
}
