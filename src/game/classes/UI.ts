import { Dimension, UIComponent, Vector2 } from ".";

export class UI {
  public name: string;
  public show: boolean;
  public position: Vector2;
  public dimension: Dimension;
  public UIComponents?: UIComponent[];

  constructor(name: string, position?: Vector2, dimension?: Dimension) {
    this.name = name;
    this.position = position ?? new Vector2(0, 0);
    this.show = true;
    this.dimension = dimension ?? new Dimension(64, 64);
  }

  public addUIComponent = (component: UIComponent = null): void => {
    if (!component) return;
    component.parent = this;
    this.UIComponents.push(component);
  };

  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.drawImage(ctx);

    this.UIComponents.forEach((child) => child.draw(ctx));
  }

  drawImage(ctx: CanvasRenderingContext2D) {}
}
