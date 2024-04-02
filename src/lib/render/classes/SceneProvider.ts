import { sceneFactory } from "..";
import { Scene } from "./Scene";

export class SceneProvider {
  private scene: Scene | null = null;

  constructor() {}

  public loadScene(name: string): void {
    this.scene = sceneFactory.create(name);
  }

  public get current(): Scene {
    return this.scene;
  }
}

