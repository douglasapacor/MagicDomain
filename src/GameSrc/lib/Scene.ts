/* eslint-disable @typescript-eslint/no-unused-vars */
import { Camera, gameEvents, GameObject, generateKey, UI, Vector2 } from "..";

export class Scene {
  public readonly name: string;
  public sceneCamera: Camera;
  private uis: UI[];
  private gameObjects: GameObject[];
  private hasReadyBeenCalled: boolean;
  public position: Vector2;

  constructor(name = "") {
    this.name = `${name ? name : generateKey(7)}_scene`;
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

  public AssembleScene() {}

  public Ready(): void {}

  public Step(delta: number, scene: Scene): void {}

  public draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.drawImage(ctx, drawPosX, drawPosY);

    this.gameObjects.forEach((go) => go.Draw(ctx, drawPosX, drawPosY));
    this.uis.forEach((u) => u.Draw(ctx, drawPosX, drawPosY));
  }

  public drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {}

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
