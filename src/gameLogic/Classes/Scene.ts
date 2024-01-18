/* eslint-disable @typescript-eslint/no-unused-vars */
import { GameObject } from "./GameObject";
import { Vector2 } from "./Vector2";

export class Scene {
  public readonly name: string;
  private position: Vector2;
  private hasReadyBeenCalled: boolean;
  private gameObjects: GameObject[];

  constructor(name: string) {
    this.name = name;
    this.position = new Vector2(0, 0);
    this.gameObjects = [];
    this.hasReadyBeenCalled = false;
  }

  public Assembly = () => {};

  public StepEntry = (delta: number, scene: Scene) => {
    this.gameObjects.forEach((child) => child.StepEntry(delta, scene));

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

    this.gameObjects.forEach((child) => child.Draw(ctx, drawPosX, drawPosY));
  };

  public DrawImage(ctx: CanvasRenderingContext2D, x: number, y: number) {}

  public AddGameObjects = (go: GameObject) => {
    go.RegisterParentScene(this);
    this.gameObjects.push(go);
  };

  public RemoveGameObjects = (gameObject: GameObject) => {
    this.gameObjects = this.gameObjects.filter((go) => {
      return gameObject !== go;
    });
  };
}
