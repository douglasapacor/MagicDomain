import { Dimension, UI, Vector2 } from "./";

export class UIComponent {
  public parent: UI | null;
  public name: string;
  public position: Vector2;
  public dimension: Dimension;
  public onClick?: () => void;
  public onMouseOver?: () => void;

  constructor(name: string, position?: Vector2, dimension?: Dimension) {
    this.name = name;
    this.position = position ?? new Vector2(0, 0);
    this.dimension = dimension ?? new Dimension(32, 32);
  }

  private inBounds = (mouseX: number, mouseY: number): boolean => {
    return !(
      mouseX < this.position.x ||
      mouseX > this.position.x + this.dimension.width ||
      mouseY < this.position.y ||
      mouseY > this.position.y + this.dimension.height
    );
  };

  draw(ctx: CanvasRenderingContext2D) {}
}
