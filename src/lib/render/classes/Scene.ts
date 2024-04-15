import { DataHolder, gameEvents } from "..";
import { GAME_EVENTS } from "../../../statics/eventlist";
import { GameObject } from "./GameObject";
import { Resource } from "./Resource";
import { Vector2 } from "./Vector2";

export class Scene extends GameObject {
  private _sceneResources: Record<string, Resource> = {};
  private _sceneData: Record<string, DataHolder> = {};
  private _loadResourcesPromise: Promise<void> | null = null;
  private _loadSceneComplete: boolean;

  constructor(name: string, position?: Vector2) {
    super(`${name}_scene`, position);
  }

  protected AddData(data: DataHolder): void {
    this._sceneData[data.name] = data;
  }

  protected AddResource(resource: Resource): void {
    this._sceneResources[resource.name] = resource;
  }

  public override StepEntry(delta: number): void {
    this.children.forEach(go => go.StepEntry(delta));

    if (!this._loadResourcesPromise)
      this._loadResourcesPromise = this.LoadResources();

    if (this._loadResourcesPromise) {
      this._loadResourcesPromise
        .then(() => {
          if (!this._readyStarted) {
            this._readyStarted = true;
            this.ready();
          }
        })
        .catch(error => {
          console.error("Erro ao carregar recursos da cena:", error);
        });
    }

    if (this._readyStarted && this._readyComplete)
      this._loadSceneComplete = true;

    if (this._loadSceneComplete) this.Step(delta);
  }

  private async LoadResources(): Promise<void> {
    const resources = Object.values(this._sceneResources);
    await Promise.all(resources.map(this.LoadResource));
  }

  private async LoadResource(resource: Resource): Promise<void> {
    try {
      await window.bridge.send(GAME_EVENTS.REQUEST_FILE, {
        fileName: `\\${resource.type}\\${resource.name}.${resource.ext}`,
        responseId: resource.eventResponseId,
      });

      await new Promise(resolve => {
        resource.image.onload = () => resolve(true);
      });

      resource.isLoaded = true;
    } catch (error) {
      console.error("Erro ao carregar recurso:", resource.name, error);
    }
  }

  protected MoveToScene(sceneName: string): void {
    gameEvents.emit(GAME_EVENTS.CHANGE_SCENE, sceneName);
  }

  public get loadSceneComplete(): boolean {
    return this._loadSceneComplete;
  }

  public get sceneResource(): Record<string, Resource> {
    return this._sceneResources;
  }

  public get sceneData(): Record<string, DataHolder> {
    return this._sceneData;
  }
}

