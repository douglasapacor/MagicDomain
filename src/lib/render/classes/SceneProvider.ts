import { SceneFactory } from "..";
import { Scene } from "./Scene";

export class SceneProvider {
  private static scene: Scene | null = null;

  private constructor() {}

  public static loadScene(name: string): void {
    if (SceneFactory.exist(name)) this.scene = SceneFactory.create(name);
    else console.warn(`Scene ${name} doesn´t axist.`);
  }

  public static get current(): Scene {
    return this.scene;
  }

  public static unloadScene(): void {
    this.scene = null;
  }
}

