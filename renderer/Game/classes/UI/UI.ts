import { Dimension2 } from "../core/Dimension2";
import { Vector2 } from "../core/Vector2";
import { UIComponent } from "./UIComponent";

export class UI {
  public name: string;
  public show: boolean;
  public position: Vector2;
  public dimension: Dimension2;
  public components: UIComponent[];

  constructor(name: string, position?: Vector2, dimension?: Dimension2) {
    this.name = name;
    this.show = false;
    this.position = position ?? new Vector2(0, 0);
    this.dimension = dimension ?? new Dimension2(0, 0);
    this.components = [];
  }

  public addChildComponent = (component: UIComponent) => {
    component.parent = this;
    this.components.unshift(component);
  };

  public draw = (ctx: CanvasRenderingContext2D) => {
    this.components.forEach((c) => c.draw(ctx));
  };

  removeChild(component: UIComponent) {
    this.components = this.components.filter((uic) => {
      return component !== uic;
    });
  }
}
