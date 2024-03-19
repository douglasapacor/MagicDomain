import { IGameObject } from "./Interfaces/IGameObject";
import { Vector2 } from "./Vector2";

export class GameObject implements IGameObject {
  public readonly name?: string;
  public parent: GameObject | null;
  public children: GameObject[];
  public hasReadyBeenCalled: boolean;
  public position: Vector2;

  constructor(name = "", position?: Vector2) {
    this.name = name;
    this.children = [];
    this.hasReadyBeenCalled = false;
    this.position = position ? position : new Vector2(0, 0);
  }

  public StepEntry = (delta: number): void => {
    this.children.forEach((go) => go.StepEntry(delta));

    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.Ready();
    }

    this.Step(delta);
  };

  public Step = (delta: number): void => {
    throw new Error(`Error in: ${delta}: Implement a step method.`);
  };

  public Ready = (): void => {
    throw new Error(`Error: Implement a Ready method.`);
  };

  public Draw = (ctx: CanvasRenderingContext2D, x: number, y: number): void => {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.DrawImage(ctx, drawPosX, drawPosY);

    this.children.forEach((go) => go.Draw(ctx, drawPosX, drawPosY));
  };

  public DrawImage = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
  ): void => {
    throw new Error(
      `Error: Implement a DrawImage method. Content: ctx: ${ctx} | x: ${x} | y: ${y}`
    );
  };

  public addChild(gameObject: GameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  public destroy() {
    this.children.forEach((child) => {
      child.destroy();
    });
    this.parent.removeChild(this);
  }

  public removeChild(gameObject: GameObject) {
    this.children = this.children.filter((g) => {
      return gameObject !== g;
    });
  }
}
