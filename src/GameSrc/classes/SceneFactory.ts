import { Scene } from "./Scene";

export class SceneFactory {
  private static readonly registry: Map<string, typeof Scene> = new Map();

  private constructor() {}

  public static registerSceneClass(
    sceneName: string,
    sceneClass: typeof Scene,
  ): void {
    this.registry.set(sceneName, sceneClass);
  }

  public static create(sceneName: string): Scene {
    const sceneClass = this.registry.get(sceneName);
    return new sceneClass(sceneName);
  }
}
