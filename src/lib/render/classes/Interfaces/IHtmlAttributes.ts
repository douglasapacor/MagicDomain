export interface IHtmlAttributes {
  id?: string;
  width?: number | string;
  height?: number | string;
  class?: string;
  children?: HTMLElement[];
  position?: string;
  top?: string;
  left?: string;
  opacity?: string;
  backgroundColor?: string;
  data?: {
    [key: string]: string;
  };
}
