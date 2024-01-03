/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { events } from "./Events";
import { Vector2 } from "./Vector2";

export class GameObject {
  public position: Vector2;
  public children: GameObject[];
  public parent: null | GameObject;
  private hasReadyBeenCalled: boolean;

  constructor(position?: Vector2) {
    this.position = position ?? new Vector2(0, 0);
    this.children = [];
    this.parent = null;
    this.hasReadyBeenCalled = false;
  }

  stepEntry = (delta: number, root: GameObject): void => {
    this.children.forEach((child) => child.stepEntry(delta, root));

    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    this.step(delta, root);
  };

  step = (delta: number, root?: GameObject): void => {};

  ready = (): void => {};

  drawImage = (
    ctx: CanvasRenderingContext2D,
    drawPosX: number,
    drawPosY: number
  ): void => {};

  draw = (ctx: CanvasRenderingContext2D, x: number, y: number): void => {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;
    this.drawImage(ctx, drawPosX, drawPosY);
    this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  };

  destroy = (): void => {
    this.children.forEach((child) => {
      child.destroy();
    });
    this.parent.removeChild(this);
  };

  addChild = (gameObject: GameObject): void => {
    gameObject.parent = this;
    this.children.push(gameObject);
  };

  removeChild = (gameObject: GameObject): void => {
    events.unsubscribe(gameObject);
    this.children = this.children.filter((g) => {
      return gameObject !== g;
    });
  };
}
