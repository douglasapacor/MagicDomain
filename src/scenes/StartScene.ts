import { Scene } from "../lib/classes/Scene";

const SCENE_NAME = "start_scene";

export class StartScene extends Scene {
  constructor() {
    super(SCENE_NAME);
  }

  public stepEntry(delta: number): void {}

  public drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {}
}
