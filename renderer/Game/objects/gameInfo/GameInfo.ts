import { GameObject } from "../../classes/GameObject";

export class GameInfo extends GameObject {
  private size: { width: number; heigth: number };

  constructor(size: { width: number; heigth: number }, name?: string) {
    super(null, name);
    this.size = size;
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.font = "30px PixGamer";
    ctx.fillStyle = "white";
    ctx.fillText("Magic Domain Game By Epic Quest", 50, 50);
    ctx.fillText(
      "Magic Domain is a product of the company Epic Quest, all rights reserved.",
      50,
      100
    );
  }
}
