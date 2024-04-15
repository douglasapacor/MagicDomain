import { ICreateElement } from "./Interfaces/ICreateElement";
import { ISetAttribute } from "./Interfaces/ISetAttribute";

export class Builder {
  public static createElement<T extends HTMLElement>(
    params: ICreateElement,
  ): T {
    let element;

    if (!params.tagName) element = document.createElement("div");
    else element = document.createElement(params.tagName);

    if (params.attributes)
      this.setAttribute({ element, params: params.attributes });

    if (params.style)
      this.setStyle(element, params.style as CSSStyleDeclaration);

    return element as T;
  }

  public static setAttribute(params: ISetAttribute): void {
    for (const [key, value] of Object.entries(params.params))
      params.element.setAttribute(key, value);
  }

  public static setStyle(
    element: HTMLElement,
    style: CSSStyleDeclaration,
  ): void {
    if (style) Object.assign(element.style, style);
  }
}
