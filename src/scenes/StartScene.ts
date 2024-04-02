import { gameEvents, Scene, textHolderProvider } from "../lib/render/";

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
    gameEvents.emit("fadeOut", 2000);
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
    ctx.fillStyle = "black";

    const width = parseInt((ctx.canvas.clientWidth / 12).toFixed(0));
    const newX = this.position.x + x + width;
    const newY = this.position.y + y + 100;

    for (let i = 0; i < textHolderProvider.current.texts.size; i++)
      ctx.fillText(
        textHolderProvider.current.getText(i + 1),
        newX,
        newY + i * 50,
      );

    // ctx.beginPath();
    // ctx.lineWidth = 2;
    // ctx.strokeStyle = "red";
    // ctx.rect(0, 0, 100, 100);
    // ctx.stroke();
  }
}
