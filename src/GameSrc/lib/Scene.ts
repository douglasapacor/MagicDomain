/* eslint-disable @typescript-eslint/no-unused-vars */
import { gameEvents } from "..";
import { GameObject } from "./GameObject";
import { UI } from "./UI";
import { Vector2 } from "./Vector2";

export class Scene {
  public readonly name: string;
  private uis: UI[];
  private gameObjects: GameObject[];
  private hasReadyBeenCalled: boolean;
  public position: Vector2;

  constructor(name = "") {
    this.name = `${name}_scene`;
    this.uis = [];
    this.gameObjects = [];
    this.position = new Vector2(0, 0);
  }

  public StepEntry(delta: number): void {
    this.gameObjects.forEach((go) => go.StepEntry(delta));
    this.uis.forEach((u) => u.StepEntry(delta));

    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.Ready();
    }

    this.Step(delta, this);
  }

  public Ready(): void {}

  public Step(delta: number, scene: Scene): void {}

  public Draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.DrawImage(ctx, drawPosX, drawPosY);

    this.gameObjects.forEach((go) => go.Draw(ctx, drawPosX, drawPosY));
    this.uis.forEach((u) => u.Draw(ctx, drawPosX, drawPosY));
  }

  public DrawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {}

  public destroy() {
    this.gameObjects.forEach((child) => {
      child.destroy();
    });

    this.uis.forEach((child) => {
      child.destroy();
    });

    gameEvents.emit("unload_scene", {});
  }

  public addUI(ui: UI) {
    ui.setScene(this);
    this.uis.push(ui);
  }

  public addGameObject(gameObject: GameObject) {
    gameObject.setScene(this);
    this.gameObjects.push(gameObject);
  }

  public removeGameObject(gameObject: GameObject) {
    this.gameObjects = this.gameObjects.filter((g) => {
      return gameObject !== g;
    });
  }

  public removeUI(ui: UI) {
    this.uis = this.uis.filter((u) => {
      return ui !== u;
    });
  }
}
