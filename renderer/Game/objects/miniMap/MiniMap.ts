import { GameObject } from "../../classes/GameObject";

export class MiniMap extends GameObject {
  constructor(name?: string) {
    super(null, name);
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.beginPath();
    ctx.arc(x, y, 80, 0, 2 * Math.PI, false);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#003300";
    ctx.stroke();
  }
}
