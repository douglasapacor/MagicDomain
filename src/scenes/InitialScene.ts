import { MainMenuUI } from "../../src/UI/MainMenuUI";
import { Resource, Scene } from "../../src/lib/render";

const SCENE_NAME = "InitialScene";

export class InitialScene extends Scene {
  constructor() {
    super(SCENE_NAME);

    this.AddResource(new Resource("title_background", "images", "png"));
    this.AddInterface(new MainMenuUI());
  }

  public drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.drawImage(
      this.sceneResource["title_background"].image,
      x,
      y,
      ctx.canvas.width,
      ctx.canvas.height,
    );
  }
}
