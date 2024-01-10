import { GameObject } from "../../classes/GameObject";

export class CharacterFrame extends GameObject {
  private life: { total: number; actual: number };
  private mana: { total: number; actual: number };
  private percentLife: number;
  private percentMana: number;

  constructor() {
    super(null);

    this.life = { total: 100, actual: 49 };
    this.mana = { total: 34, actual: 12 };
    this.percentLife = (this.life.total / this.life.actual) * 100;
    this.percentLife = (this.mana.total / this.mana.actual) * 100;
  }

  step(_delta: number): void {
    this.percentLife = (this.life.total / this.life.actual) * 100;
    this.percentLife = (this.mana.total / this.mana.actual) * 100;
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = "#90A4AE";
    ctx.fillRect(x, y, 200, 80);
  }
}
