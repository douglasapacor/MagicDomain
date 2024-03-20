export interface IHtmlBuilderAttributes {
  id?: string;
  width?: number;
  height?: number;
  classes?: string;
  children?: HTMLElement[];
  data?: {
    [key: string]: string;
  };
}

