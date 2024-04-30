import { Resource, Scene } from "../lib/render";

const SCENE_NAME = "StudioScene";

export class StudioScene extends Scene {
  constructor() {
    super(SCENE_NAME);
    this.AddResource(new Resource("eq_logo", "images"));

    setTimeout(() => {
      console.log("scene changed");

      this.MoveToScene("InitialScene");
    }, 2000);
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

    ctx.drawImage(
      this.sceneResource["eq_logo"].image,
      this.position.x + x + width,
      this.position.y + y + height,
    );
  }
}
