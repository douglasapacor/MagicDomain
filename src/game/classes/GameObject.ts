/* eslint-disable @typescript-eslint/no-unused-vars */
import { gameEvents, GameScene, Vector2 } from ".";

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

  public stepEntry = (delta: number, root: GameScene): void => {
    this.children.forEach((child) => child.stepEntry(delta, root));

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

    this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }

  drawImage(
    ctx: CanvasRenderingContext2D,
    drawPosX: number,
    drawPosY: number
  ) {}

  destroy() {
    this.children.forEach((child) => {
      child.destroy();
    });
    this.parent.removeChild(this);
  }

  addChild(gameObject: GameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeChild(gameObject: GameObject) {
    gameEvents.unsubscribe(gameObject);
    this.children = this.children.filter((g) => {
      return gameObject !== g;
    });
  }
}
