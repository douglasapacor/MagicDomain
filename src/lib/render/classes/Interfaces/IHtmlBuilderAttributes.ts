export interface IHtmlBuilderAttributes {
  id?: string;
  width?: number | string;
  height?: number | string;
  classes?: string;
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
