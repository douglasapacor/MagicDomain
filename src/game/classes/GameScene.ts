/* eslint-disable @typescript-eslint/no-unused-vars */
import { GameObject } from "./GameObject";
import { Input } from "./Input";
import { UI } from "./UI";
import { Vector2 } from "./Vector2";

export class GameScene {
  public readonly name?: string;
  public input?: Input | null;
  public position: Vector2;
  public isInitialScene?: boolean = false;
  public gameObjects: GameObject[];
  public gui: UI[];
  private hasReadyBeenCalled: boolean;
  public step: (_delta: number, root: GameScene) => void;
  public ready: () => void;

  constructor(name?: string) {
    this.position = new Vector2(0, 0);
    this.gameObjects = [];
    this.gui = [];
    this.name = name;
  }

  public stepEntry = (delta: number, root: GameScene): void => {
    this.gameObjects.forEach((child) => child.stepEntry(delta, root));
    this.gui.forEach((child) => child.stepEntry(delta, root));

    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    this.step(delta, root);
  };

  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.drawImage(ctx, drawPosX, drawPosY);

    this.gameObjects.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
    this.gui.forEach((ui) => ui.draw(ctx, drawPosX, drawPosY));
  }

  drawImage(
    ctx: CanvasRenderingContext2D,
    drawPosX: number,
    drawPosY: number
  ) {}

  destroyGameObject() {
    this.gameObjects.forEach((child) => {
      child.destroy();
    });
  }

  addGameObject(gameObject: GameObject) {
    this.gameObjects.push(gameObject);
  }

  removeGameObject(gameObject: GameObject) {
    this.gameObjects = this.gameObjects.filter((g) => {
      return gameObject !== g;
    });
  }

  addUI(ui: UI) {
    ui.parent = this;
    this.gui.push(ui);
  }
}
