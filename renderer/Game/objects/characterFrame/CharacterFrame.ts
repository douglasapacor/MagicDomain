import { GameObject } from "../../classes/GameObject";

export class CharacterFrame extends GameObject {
  private life: { total: number; actual: number };
  private mana: { total: number; actual: number };

  constructor(name?: string) {
    super(null, name);
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = "#90A4AE";
    ctx.fillRect(x, y, 200, 80);
  }
}
