import { Resource } from "../lib/render/classes/Resource";
import { Scene } from "../lib/render/classes/Scene";
const SCENE_NAME = "StudioScene";

export class StudioScene extends Scene {
  constructor() {
    super(SCENE_NAME);
    this.AddResource(new Resource("eq_logo", "images"));

    setTimeout(() => {
      this.MoveToScene("InitialScene");
    }, 5000);
  }

  public override ready(): void {
    this._readyComplete = true;
  }

  public override drawImage(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
  ): void {
    ctx.translate(0, 0);
    const width = parseInt(
      (
        ctx.canvas.width / 2 -
        this.sceneResource["eq_logo"].image.width / 2
      ).toFixed(0),
    );
    const height = parseInt(
      (
        ctx.canvas.height / 2 -
        this.sceneResource["eq_logo"].image.height / 2
      ).toFixed(0),
    );
    const newX = this.position.x + x + width;
    const newY = this.position.y + y + height;

    ctx.drawImage(this.sceneResource["eq_logo"].image, newX, newY);
  }
}
