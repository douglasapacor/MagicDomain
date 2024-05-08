import { Resource, Scene, Sound } from "../../src/lib/render";
import { WorldDetailsData } from "../../src/scriptableObjects/WorldDetailsData";
import { NewGameUI } from "../../src/UI/NewGameUI";

const SCENE_NAME = "NewGameScene";

export class NewGameScene extends Scene {
  constructor() {
    super(SCENE_NAME);

    this.AddResource(
      new Resource("xibalba_new_game", "images", "gif", "world"),
    );
    this.AddResource(new Resource("aethel_new_game", "images", "gif", "world"));
    this.AddResource(new Resource("mu_new_game", "images", "gif", "world"));
    this.AddResource(new Resource("newgame_backgound", "images", "jpg"));
    this.AddSound(new Sound("button-pop", "mp3"));
    this.AddSound(new Sound("success-start", "wav"));
    this.AddData(new WorldDetailsData());
    this.AddInterface(
      new NewGameUI({
        sceneResources: this.sceneResource,
        sceneData: this.sceneData,
        sceneSounds: this.sceneSound,
      }),
    );
  }

  public drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.drawImage(
      this.sceneResource["newgame_backgound"].image,
      x,
      y,
      ctx.canvas.width,
      ctx.canvas.height,
    );
  }
}
