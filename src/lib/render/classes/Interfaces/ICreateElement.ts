import { IHtmlBuilderAttributes } from "./IHtmlBuilderAttributes";

export interface ICreateElement {
  tagName: keyof HTMLElementTagNameMap;
  attributes?: IHtmlBuilderAttributes;
  style?: unknown;
}

