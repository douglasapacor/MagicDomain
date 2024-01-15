/* eslint-disable @typescript-eslint/no-unused-vars */
import { GameObject } from "./GameObject";
import { Input } from "./Input";
import { Vector2 } from "./Vector2";

export class GameScene {
  public readonly name?: string;
  public input?: Input | null;
  public position: Vector2;
  public isInitialScene?: boolean = false;
  public children: GameObject[];
  private hasReadyBeenCalled: boolean;

  constructor(name?: string) {
    this.position = new Vector2(0, 0);
    this.children = [];
    this.name = name;
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
  }

  addChild(gameObject: GameObject) {
    this.children.push(gameObject);
  }

  removeChild(gameObject: GameObject) {
    this.children = this.children.filter((g) => {
      return gameObject !== g;
    });
  }
}
