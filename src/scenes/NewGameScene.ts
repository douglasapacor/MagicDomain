import { Resource, Scene } from "../../src/lib/render";
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
    this.AddData(new WorldDetailsData());
    this.AddInterface(
      new NewGameUI({
        sceneResources: this.sceneResource,
        sceneData: this.sceneData,
      }),
    );
  }
}
