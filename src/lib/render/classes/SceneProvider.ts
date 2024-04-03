import { SceneFactory } from "..";
import { Scene } from "./Scene";

export class SceneProvider {
  private static scene: Scene | null = null;

  private constructor() {}

  public static loadScene(name: string): void {
    this.scene = SceneFactory.create(name);
  }

  public static get current(): Scene {
    return this.scene;
  }
}

