import { GameObject } from "../../classes/GameObject";

export class PartyFrame extends GameObject {
  constructor(name?: string) {
    super(null, name);
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = "#263238";
    ctx.fillRect(x, y, 150, 300);
  }
}
