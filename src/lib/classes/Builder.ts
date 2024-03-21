import { IHtmlBuilderAttributes } from "./Interfaces/IHtmlBuilderAttributes";

export class Builder {
  public static createElement<T extends HTMLElement>(
    tagName: keyof HTMLElementTagNameMap,
    attributes?: IHtmlBuilderAttributes,
    style?: CSSStyleDeclaration,
  ): T {
    const element = document.createElement(tagName);

    if (attributes) this.setAttribute(element, attributes);
    if (style) this.setStyle(element, style);

    return element as T;
  }

  private static setAttribute(
    element: HTMLElement,
    params: IHtmlBuilderAttributes,
  ): void {
    for (const [key, value] of Object.entries(params)) {
      element.setAttribute(key, value);
    }
  }

  private static setStyle(
    element: HTMLElement,
    style: CSSStyleDeclaration,
  ): void {
    if (style) Object.assign(element.style, style);
  }
}
