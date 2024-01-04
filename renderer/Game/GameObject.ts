import { events } from "./Event";
import { Vector2 } from "./Vector2";

export class GameObject {
  public readonly name?: string;
  public position: Vector2;
  public children: GameObject[];
  public parent: GameObject | null;
  private hasReadyBeenCalled: boolean;

  constructor(position?: Vector2, name?: string) {
    this.name = name ?? "";
    this.position = position ?? new Vector2(0, 0);
    this.children = [];
    this.parent = null;
    this.hasReadyBeenCalled = false;
  }

  public stepEntry = (delta, root): void => {
    this.children.forEach((child) => child.stepEntry(delta, root));

    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    this.step(delta, root);
  };

  ready() {}

  step(_delta: number, root: GameObject) {}

  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.drawImage(ctx, drawPosX, drawPosY);

    this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }

  drawImage(ctx, drawPosX: number, drawPosY: number) {}

  destroy() {
    this.children.forEach((child) => {
      child.destroy();
    });
    this.parent.removeChild(this);
  }

  addChild(gameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeChild(gameObject) {
    events.unsubscribe(gameObject);
    this.children = this.children.filter((g) => {
      return gameObject !== g;
    });
  }
}
