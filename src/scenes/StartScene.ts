import { Scene, textHolderProvider } from "../lib/render/";

const SCENE_NAME = "StartScene";

export class StartScene extends Scene {
  constructor() {
    super(SCENE_NAME);
    textHolderProvider.loadTextHolder("StartTextData");

    setTimeout(() => {
      this.MoveToScene("StudioScene");
    }, 5000);
  }

  public ready(): void {
    this._readyComplete = true;
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

    const newX =
      this.position.x + x + parseInt((ctx.canvas.width / 13).toFixed(0));
    const newY = this.position.y + y + 100;

    for (let i = 0; i < textHolderProvider.current.texts.size; i++)
      ctx.fillText(
        textHolderProvider.current.getText(i + 1),
        newX,
        newY + i * 50,
      );
  }
}
