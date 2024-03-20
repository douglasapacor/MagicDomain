import { Scene } from "../gamesrc/classes/Scene";

export class MainScene extends Scene {
  constructor() {
    super("MainScene");
  }

  public stepEntry(delta: number): void {}

  public drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {}
}

