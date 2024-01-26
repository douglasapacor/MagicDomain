/* eslint-disable @typescript-eslint/no-unused-vars */
import { Scene, Vector2 } from "..";

export class GameObject {
  public readonly name: string;
  public parent: GameObject | null;
  public children: GameObject[];
  public hasReadyBeenCalled: boolean;
  public position: Vector2;
  public scene: Scene | null;

  constructor(name = "", position?: Vector2) {
    this.name = `${name}_gameobject`;
    this.children = [];
    this.hasReadyBeenCalled = false;
    this.position = position ? position : new Vector2(0, 0);
    this.scene = null;
  }

  public Assemble = () => {};

  public StepEntry = (delta: number): void => {
    this.children.forEach((go) => go.StepEntry(delta));

    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.Ready();
    }

    this.Step(delta, this.scene);
  };

  public Ready = (): void => {};

  public Step = (delta: number, scene: Scene): void => {};

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
  ): void => {};

  public setScene = (scene: Scene) => {
    this.scene = scene;
    this.children.forEach((go) => go.setScene(scene));
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
