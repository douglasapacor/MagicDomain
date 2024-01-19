import { GameObject } from "./GameObject";
import { Vector2 } from "./Vector2";

export class GUI {
  private position: Vector2;
  private children: GameObject[];

  constructor() {
    this.position = new Vector2(0, 0);
  }

  public Draw = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.DrawImage(ctx, drawPosX, drawPosY);

    this.children.forEach((child) => child.Draw(ctx, drawPosX, drawPosY));
  };

  public DrawImage(ctx: CanvasRenderingContext2D, x: number, y: number) {}
}
