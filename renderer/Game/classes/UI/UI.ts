import { Dimension } from "../core/Dimension";
import { Vector2 } from "../core/Vector2";

export class UI {
  public position: Vector2;
  public dimension: Dimension;

  constructor(position?: Vector2, dimension?: Dimension) {
    this.position = position ?? new Vector2(0, 0);
    this.dimension = dimension ?? new Dimension(0, 0);
  }

  public draw(ctx: CanvasRenderingContext2D) {}
}
