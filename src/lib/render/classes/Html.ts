import { Builder } from "./Builder";

export class Html {
  private readonly container: HTMLCanvasElement;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly overlayElement: HTMLElement;

  constructor() {
    this.container = Builder.createElement({
      tagName: "div",
      attributes: { id: "GameContainer" },
      style: {
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
      },
    });
    this.canvas = Builder.createElement({
      tagName: "canvas",
      attributes: { id: "GameCanva", width: 1280, height: 768 },
      style: {
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        width: "100%",
        height: "100%",
      },
    });
    this.ctx = this.canvas.getContext("2d");
    this.overlayElement = Builder.createElement({
      tagName: "div",
      attributes: { id: "GameOverlay" },
      style: {
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        opacity: "1",
      },
    });
    this.container.appendChild(this.canvas);
    this.container.appendChild(this.overlayElement);

    document.body.appendChild(this.container);
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
