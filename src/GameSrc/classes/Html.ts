import { Builder } from "./Builder";

export class Html {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public builder: Builder;

  constructor() {
    this.builder = new Builder();
    this.canvas = this.builder.createCanvas();
    this.ctx = this.canvas.getContext("2d");
  }
}
