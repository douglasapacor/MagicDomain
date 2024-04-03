import { Scene, textHolderProvider } from "../lib/render/";

const SCENE_NAME = "StartScene";

export class StartScene extends Scene {
  constructor() {
    super(SCENE_NAME);
  }

  public override preLoad(): void {
    textHolderProvider.loadTextHolder("StartTextData");
    this.preLoadFinished = true;
  }

  public ready(): void {
    this.readyFinished = true;
  }

  public override drawImage(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
  ): void {
    ctx.translate(0, 0);
    ctx.font = "30pt PixGamer";
    ctx.textAlign = "left";
    ctx.fillStyle = "white";

    const width = parseInt((ctx.canvas.clientWidth / 13).toFixed(0));

    const newX = this.position.x + x + width;
    const newY = this.position.y + y + 100;

    for (let i = 0; i < textHolderProvider.current.texts.size; i++)
      ctx.fillText(
        textHolderProvider.current.getText(i + 1),
        newX,
        newY + i * 50,
      );
  }
}
