import { htmlBuilderParams } from "./types/htmlBuilderParams";

export class Builder {
  public createCanvas = (params?: htmlBuilderParams): HTMLCanvasElement => {
    const element = document.createElement("canvas");

    if (params) {
      if (params.id) element.id = params.id;
      if (params.classes) element.className = params.classes;
      if (params.width) element.style.width = params.width;
      if (params.height) element.style.height = params.height;
    }

    return element;
  };
}
