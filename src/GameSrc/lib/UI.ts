import { Scene, Vector2, generateKey } from "..";
/* eslint-disable @typescript-eslint/no-unused-vars */

export class UI {
  public readonly name: string;
  public parent: UI | null;
  public children: UI[];
  public hasReadyBeenCalled: boolean;
  public position: Vector2;
  public scene: Scene | null;

  constructor(name = "", position?: Vector2) {
    this.name = `${name ? name : generateKey(7)}_ui`;
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
    this.children.forEach((go) => go.setScene(this.scene));
  };

  addChild(ui: UI) {
    ui.parent = this;
    this.children.push(ui);
  }

  destroy() {
    this.children.forEach((child) => {
      child.destroy();
    });

    this.parent.removeChild(this);
  }

  removeChild(ui: UI) {
    this.children = this.children.filter((u) => {
      return ui !== u;
    });
  }
}
