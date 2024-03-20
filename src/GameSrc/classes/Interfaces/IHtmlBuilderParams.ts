export interface IHtmlBuilderParams {
  id?: string;
  classes?: string;
  style?: {
    [key: string]: string;
  };
  children?: HTMLElement[];
  data?: {
    [key: string]: string;
  };
}

