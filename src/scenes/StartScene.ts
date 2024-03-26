import { Scene } from "../lib/classes/Scene";
const SCENE_NAME = "start_scene";

export class StartScene extends Scene {
  constructor() {
    super(SCENE_NAME);
  }

  public override preLoad(): void {
    // console.log("preload");
  }

  public override step(delta: number): void {
    // console.log("StartScene: ", delta);
  }
}
