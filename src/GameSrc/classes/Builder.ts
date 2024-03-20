import { IHtmlBuilderParams } from "./Interfaces/IHtmlBuilderParams";

export class Builder {
  public createElement<T extends HTMLElement>(
    tagName: keyof HTMLElementTagNameMap,
    params?: IHtmlBuilderParams,
  ): T {
    const element = document.createElement(tagName);

    if (params) {
      this.setAttribute(element, params);
      this.setStyle(element, params);
    }

    return element as T;
  }

  private setAttribute(element: HTMLElement, params: IHtmlBuilderParams): void {
    for (const [key, value] of Object.entries(params)) {
      if (key !== "style") element.setAttribute(key, value);
    }
  }

  private setStyle(element: HTMLElement, params: IHtmlBuilderParams): void {
    if (params.style) Object.assign(element.style, params.style);
  }
}
