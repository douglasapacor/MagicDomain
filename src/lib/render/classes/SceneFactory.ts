import { Scene } from "./Scene";

export class SceneFactory {
  private readonly registry: Map<string, typeof Scene> = new Map();

  constructor() {}

  public register(sceneName: string, sceneClass: typeof Scene): void {
    this.registry.set(sceneName, sceneClass);
  }

  public create(sceneName: string): Scene {
    const sceneClass = this.registry.get(sceneName);
    return new sceneClass(sceneName);
  }
}
