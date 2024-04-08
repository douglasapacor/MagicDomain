import { Builder } from "./Builder";

export class Html {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private readonly overlayElement: HTMLElement;

  constructor() {
    this.canvas = Builder.createElement({
      tagName: "canvas",
      attributes: { width: 1280, height: 768 },
    });
    this.ctx = this.canvas.getContext("2d");

    this.overlayElement = Builder.createElement({
      tagName: "div",
    });

    Builder.setStyle(this.overlayElement, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "black",
      opacity: "1",
    });

    document.body.appendChild(this.canvas);
    document.body.appendChild(this.overlayElement);
  }

  public get context(): CanvasRenderingContext2D {
    return this.ctx;
  }

  public get canvasElement(): HTMLCanvasElement {
    return this.canvas;
  }

  public get overlay(): HTMLElement {
    return this.overlayElement;
  }
}
