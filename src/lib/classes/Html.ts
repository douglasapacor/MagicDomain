import { Builder } from "./Builder";

export class Html {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = Builder.createElement("canvas", { width: 1280, height: 768 });
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
  }

  public get context(): CanvasRenderingContext2D {
    return this.ctx;
  }

  public get canvasElement(): HTMLCanvasElement {
    return this.canvas;
  }
}
