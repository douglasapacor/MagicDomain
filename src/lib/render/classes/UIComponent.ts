import { Builder } from "./Builder";
import { IUIComponentConstructor } from "./Interfaces/IUIComponentConstructor";

export class UIComponent {
  protected readonly _name: string;
  protected _element: HTMLElement;
  constructor(params: IUIComponentConstructor) {
    this._name = params.name;
    this._element = Builder.createElement({
      tagName: params.tagName,
      style: params.style,
      attributes: params.attributes,
    });

    this._element.onclick = this.onClick;
  }

  public onClick = () => {};

  public addChildren(children: HTMLElement): void {
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

  public get style(): CSSStyleDeclaration {
    return this._element.style;
  }

  public set style(style: CSSStyleDeclaration) {
    Builder.setStyle(this.element, style);
  }

  public set className(className: string) {
    this.element.className = className;
  }
}
