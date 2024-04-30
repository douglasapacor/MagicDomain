import { NewGameUI } from "../../src/UI/NewGameUI";
import { Resource, Scene } from "../../src/lib/render";

const SCENE_NAME = "NewGameScene";

export class NewGameScene extends Scene {
  constructor() {
    super(SCENE_NAME);
    this.AddResource(
      new Resource("xibalba_new_game", "images", "gif", "world"),
    );
    this.AddResource(new Resource("aethel_new_game", "images", "gif", "world"));
    this.AddResource(new Resource("mu_new_game", "images", "gif", "world"));

    this.AddInterface(new NewGameUI({ sceneResources: this.sceneResource }));
  }
}
