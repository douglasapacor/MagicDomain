import { Dimension2 } from "../core/Dimension2";
import { Vector2 } from "../core/Vector2";
import { UI } from "./UI";

export class UIComponent {
  public position: Vector2;
  public dimension: Dimension2;
  public parent: UI | null;
  onClick?: () => void;
  onMouseOver: () => void;

  constructor(position?: Vector2, dimension?: Dimension2) {
    this.position = position ?? new Vector2(0, 0);
    this.dimension = dimension ?? new Dimension2(2, 2);
  }

  draw(ctx: CanvasRenderingContext2D) {}

  destroy() {
    this.parent.removeChild(this);
  }
}
