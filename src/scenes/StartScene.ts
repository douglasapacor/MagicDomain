import { Scene, TextHolderProvider } from "../lib/render/";

const SCENE_NAME = "StartScene";

export class StartScene extends Scene {
  constructor() {
    super(SCENE_NAME);
  }

  public preLoad(): void {
    TextHolderProvider.loadTextHolder("StartTextData");
  }

  public drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    const XX = x + 50;
    const YY = y + 50;

    ctx.fillText(TextHolderProvider.current.getText(1), XX, YY);
  }
}
