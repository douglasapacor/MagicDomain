import { IHtmlBuilderAttributes } from "./Interfaces/IHtmlBuilderAttributes";

export class Builder {
  public static createElement<T extends HTMLElement>(
    tagName: keyof HTMLElementTagNameMap,
    attributes?: IHtmlBuilderAttributes,
    style?: unknown,
  ): T {
    const element = document.createElement(tagName);

    if (attributes) this.setAttribute(element, attributes);
    if (style) this.setStyle(element, style as CSSStyleDeclaration);

    return element as T;
  }

  public static setAttribute(
    element: HTMLElement,
    params: IHtmlBuilderAttributes,
  ): void {
    for (const [key, value] of Object.entries(params)) {
      element.setAttribute(key, value);
    }
  }

  public static setStyle(element: HTMLElement, style: unknown): void {
    if (style) Object.assign(element.style, style);
  }
}
