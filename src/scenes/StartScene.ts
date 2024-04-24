import { StartSceneData } from "../../src/scriptableObjects/StartSceneData";
import { Scene } from "../lib/render/";

const SCENE_NAME = "StartScene";

export class StartScene extends Scene {
  constructor() {
    super(SCENE_NAME);
    this.AddData(new StartSceneData());

    setTimeout(() => {
      this.MoveToScene("StudioScene");
    }, 2000);
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

    for (
      let i = 0;
      i < this.sceneData["StartSceneData"].getData().text.size;
      i++
    )
      ctx.fillText(
        this.sceneData["StartSceneData"].getData().text.get(i + 1),
        this.position.x + x + parseInt((ctx.canvas.width / 13).toFixed(0)),
        this.position.y + y + 100 + i * 50,
      );
  }
}
