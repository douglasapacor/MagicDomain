import { Scene } from "./Scene";
import { SceneFactory } from "./SceneFactory";

export class SceneProvider {
  private static scene: Scene | null = null;

  private constructor() {}

  public static loadScene(name: string) {
    this.scene = SceneFactory.create(name);
  }

  public static get current(): Scene {
    return this.scene;
  }
}

