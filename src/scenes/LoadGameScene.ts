import { Scene } from "../../src/lib/render";

const SCENE_NAME = "LoadGameScene";

export class LoadGameScene extends Scene {
  constructor() {
    super(SCENE_NAME);
  }

  public drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.font = "30pt PixGamer";
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    ctx.fillText("load game scene", x + 100, y + 100);
  }
}

