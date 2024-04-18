import { MainMenuUI } from "../../src/UI/MainMenuUI";
import { Resource, Scene, Sound } from "../../src/lib/render";

const SCENE_NAME = "InitialScene";

export class InitialScene extends Scene {
  constructor() {
    super(SCENE_NAME);

    this.AddResource(new Resource("title_background", "images", "png"));
    this.AddResource(new Resource("title_logo", "images", "png"));
    this.AddSound(new Sound("button-pop", "mp3"));
    this.AddInterface(
      new MainMenuUI({
        sceneSounds: this.sceneSound,
        sceneResources: this.sceneResource,
      }),
    );
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
