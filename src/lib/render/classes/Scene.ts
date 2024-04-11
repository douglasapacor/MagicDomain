import { gameEvents, GameObject, Vector2 } from "..";
import { GAME_EVENTS } from "../../../statics/eventlist";
import { Resource } from "./Resource";

export class Scene extends GameObject {
  private _sceneResources: Record<string, Resource>;
  private _loadResourcesStarted: boolean;
  private _loadResourcesComplete: boolean;
  private _loadSceneComplete: boolean;

  constructor(name: string, position?: Vector2) {
    super(`${name}_scene`, position);
    this._sceneResources = {};
    this._loadResourcesStarted = false;
    this._loadResourcesComplete = false;
    this._loadSceneComplete = false;
  }

  public override StepEntry(delta: number): void {
    this.children.forEach(go => go.StepEntry(delta));

    if (!this._loadResourcesStarted) {
      this._loadResourcesStarted = true;
      this._loadResourcesComplete = false;
      this.LoadResources();
    }

    if (!this._loadResourcesComplete) this.LoadResourcesStep();

    if (
      !this._readyStarted &&
      this._loadResourcesStarted &&
      this._loadResourcesComplete
    ) {
      this._readyStarted = true;
      this._readyComplete = false;
      this.ready();
    }

    if (
      this._loadResourcesStarted &&
      this._loadResourcesComplete &&
      this._readyStarted &&
      this._readyComplete &&
      !this._loadSceneComplete
    ) {
      this._loadSceneComplete = true;
    }

    if (this._loadSceneComplete) this.Step(delta);
  }

  protected MoveToScene(sceneName: string): void {
    gameEvents.emit(GAME_EVENTS.CHANGE_SCENE, sceneName);
  }

  private LoadResources(): void {
    Object.keys(this._sceneResources).forEach(resource => {
      this._sceneResources[resource].load();
    });
  }

  private LoadResourcesStep(): void {
    const sceneKeys = Object.keys(this._sceneResources);

    if (sceneKeys.length <= 0) {
      this._loadResourcesComplete = true;
      return;
    }

    let completeEvent = true;

    for (let i = 0; i < sceneKeys.length; i++) {
      if (!this._sceneResources[sceneKeys[i]].isLoaded) {
        completeEvent = false;
        break;
      }
    }

    this._loadResourcesComplete = completeEvent;
  }

  protected AddResource(resource: Resource): void {
    this._sceneResources[resource.name] = resource;
  }

  public get loadSceneComplete(): boolean {
    return this._loadSceneComplete;
  }

  public get sceneResource(): Record<string, Resource> {
    return this._sceneResources;
  }
}
