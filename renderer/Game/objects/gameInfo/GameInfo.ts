import { GameObject } from "../../classes/GameObject";

export class GameInfo extends GameObject {
  private alpha: number = 0.0;
  private change: number = 0.01;
  private fade: "in" | "out";
  private size: { width: number; heigth: number };

  constructor(size: { width: number; heigth: number }, name?: string) {
    super(null, name);
    this.size = size;
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    if (this.fade === "in") {
      this.alpha += this.change;
      if (this.alpha >= 1) {
        this.alpha = 1;
        this.fade = "out";
      }
    } else {
      this.alpha -= this.change;
      if (this.alpha < 0) {
        this.alpha = 0;
        this.fade = "in";
      }
    }

    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.size.width, this.size.heigth);
  }
}
