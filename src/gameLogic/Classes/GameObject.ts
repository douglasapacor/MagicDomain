/* eslint-disable @typescript-eslint/no-unused-vars */
import { Scene } from "./Scene";
import { Vector2 } from "./Vector2";

export class GameObject {
  public readonly name: string;
  private position: Vector2;
  private parentScene: Scene;
  private parent: GameObject | null;
  private children: GameObject[];
  private hasReadyBeenCalled: boolean;

  constructor(name: string, position?: Vector2) {
    this.name = name;
    this.position = position ? position : new Vector2(0, 0);
    this.children = [];
    this.parent = null;
    this.parentScene = null;
    this.hasReadyBeenCalled = false;
  }

  public StepEntry = (delta: number, scene: Scene) => {
    this.children.forEach((child) => child.StepEntry(delta, scene));

    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.Ready();
    }

    this.Step(delta, scene);
  };

  public Ready = () => {};

  public Step = (delta: number, scene: Scene) => {};

  public Draw = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.DrawImage(ctx, drawPosX, drawPosY);

    this.children.forEach((child) => child.Draw(ctx, drawPosX, drawPosY));
  };

  public DrawImage(ctx: CanvasRenderingContext2D, x: number, y: number) {}

  public RegisterParentScene = (sc: Scene): void => {
    this.parentScene = sc;
  };

  public destroy() {
    this.children.forEach((child) => {
      child.destroy();
    });

    if (this.parent) this.parent.remove(this);

    this.parentScene.RemoveGameObjects(this);
  }

  public AddGameObject(gameObject: GameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  public remove(gameObject: GameObject) {
    this.children = this.children.filter((g) => {
      return gameObject !== g;
    });
  }
}
