/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dimension, GameScene, UIComponent, Vector2 } from ".";

export class UI {
  public name: string;
  public parent: GameScene | null;
  public show: boolean;
  public position: Vector2;
  public dimension: Dimension;
  public components?: UIComponent[];
  private hasReadyBeenCalled: boolean;

  constructor(name: string, position?: Vector2, dimension?: Dimension) {
    this.name = name;
    this.components = [];
    this.parent = null;
    this.position = position ?? new Vector2(0, 0);
    this.show = true;
    this.dimension = dimension ?? new Dimension(64, 64);
  }

  public stepEntry = (delta: number, root: GameScene): void => {
    this.components.forEach((child) => child.stepEntry(delta, root));

    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    this.step(delta, root);
  };

  ready() {}

  step(_delta: number, root: GameScene) {}

  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.drawImage(ctx, drawPosX, drawPosY);

    this.components.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }

  drawImage(
    ctx: CanvasRenderingContext2D,
    drawPosX: number,
    drawPosY: number
  ) {}

  destroyUIComponents() {
    this.components.forEach((child) => {
      child.destroyUIComponent();
    });
  }

  addUIComponents(components: UIComponent) {
    components.parent = this;
    this.components.push(components);
  }

  removeUIComponents(components: UIComponent) {
    this.components = this.components.filter((g) => {
      return components !== g;
    });
  }
}
