/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { gameEvents, Vector2 } from ".";

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

  public stepEntry = (delta: number, root: any): void => {
    this.children.forEach((child) => child.stepEntry(delta, root));

    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    this.step(delta, root);
  };

  ready() {}

  step(_delta: number, root: any) {}

  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.drawImage(ctx, drawPosX, drawPosY);

    this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }

  drawImage(
    ctx: CanvasRenderingContext2D,
    drawPosX: number,
    drawPosY: number
  ) {}

  destroyGameObject() {
    this.children.forEach((child) => {
      child.destroyGameObject();
    });

    this.parent.removeGameObject(this);
  }

  addGameObject(gameObject: GameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeGameObject(gameObject: GameObject) {
    gameEvents.unsubscribe(gameObject);

    this.children = this.children.filter((g) => {
      return gameObject !== g;
    });
  }
}
