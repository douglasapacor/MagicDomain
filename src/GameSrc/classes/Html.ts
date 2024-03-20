import { Builder } from "./Builder";

export class Html {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  public builder: Builder;

  constructor() {
    this.builder = new Builder();
    this.canvas = this.builder.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  public get context(): CanvasRenderingContext2D {
    return this.ctx;
  }

  public get canvasElement(): HTMLCanvasElement {
    return this.canvas;
  }
}
