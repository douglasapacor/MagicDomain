import { HtmlBuilder } from "./HtmlBuilder";

export class Html {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public htmlTool: HtmlBuilder;

  constructor() {
    this.htmlTool = new HtmlBuilder();
    this.canvas = this.htmlTool.createCanvas();
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = 1280;
    this.canvas.height = 720;

    const container = this.htmlTool.createDiv({ id: "GameContainer" });

    container.appendChild(this.canvas);
    document.body.appendChild(container);
  }
}
