import { IHtmlBuilderAttributes } from "./IHtmlBuilderAttributes";

export interface IUIComponentConstructor {
  name: string;
  tagName?: keyof HTMLElementTagNameMap;
  attributes?: IHtmlBuilderAttributes;
  style?: CSSStyleDeclaration;
}

