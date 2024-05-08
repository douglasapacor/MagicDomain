import {
  DataHolder,
  gameEvents,
  GameObject,
  GUI,
  Resource,
  Sound,
  Vector2,
} from "..";
import { GAME_EVENTS } from "../../../statics/eventlist";

export class Scene extends GameObject {
  private _sceneResources: Record<string, Resource> = {};
  private _sceneData: Record<string, DataHolder> = {};
  private _sceneInterface: Record<string, GUI> = {};
  private _sceneSounds: Record<string, Sound> = {};
  private _loadResourcesPromise: Promise<void> | null = null;
  private _loadSoundsPromise: Promise<void> | null = null;
  private _loadResourcesComplete: boolean;
  private _loadSoundComplete: boolean;
  private _loadSceneComplete: boolean;

  constructor(name: string, position?: Vector2) {
    super(`${name}_scene`, position);
    this._loadResourcesComplete = false;
    this._loadSoundComplete = false;
    this._loadSceneComplete = false;
  }

  protected AddInterface(gui: GUI): void {
    this._sceneInterface[gui.name] = gui;
  }

  protected AddData(data: DataHolder): void {
    this._sceneData[data.name] = data;
  }

  protected AddResource(resource: Resource): void {
    this._sceneResources[resource.name] = resource;
  }

  protected AddSound(sound: Sound): void {
    this._sceneSounds[sound.name] = sound;
  }

  public override StepEntry(delta: number): void {
    this.children.forEach(go => go.StepEntry(delta));

    if (!this._loadResourcesPromise)
      this._loadResourcesPromise = this.LoadResources();

    if (this._loadResourcesPromise) {
      this._loadResourcesPromise
        .then(() => {
          this._loadResourcesComplete = true;
        })
        .catch(error => {
          console.error("Erro ao carregar recursos da cena:", error);
        });
    }

    if (!this._loadSoundsPromise) this._loadSoundsPromise = this.LoadSounds();

    if (this._loadSoundsPromise) {
      this._loadSoundsPromise
        .then(() => {
          this._loadSoundComplete = true;
        })
        .catch(error => {
          console.error("Erro ao carregar recursos da cena:", error);
        });
    }

    if (this._loadResourcesComplete && this._loadSoundComplete) {
      if (!this._readyStarted) {
        this._readyStarted = true;
        this.ready();
      }
    }

    if (this._readyStarted && this._readyComplete)
      this._loadSceneComplete = true;

    Object.values(this._sceneInterface).forEach(item => {
      item.Step();
    });

    if (this._loadSceneComplete) this.Step(delta);
  }

  private async LoadSounds(): Promise<void> {
    const sounds = Object.values(this._sceneSounds);
    await Promise.all(sounds.map(this.LoadSound));
  }

  private async LoadSound(sound: Sound): Promise<void> {
    try {
      await window.bridge.send(GAME_EVENTS.REQUEST_SOUND, {
        fileName: `\\sounds\\${sound.name}.${sound.ext}`,
        responseId: sound.eventResponseId,
      });

      await new Promise(resolve => {
        sound.onload = () => resolve(true);
      });

      sound.isLoaded = true;
    } catch (error) {
      console.error("Erro ao carregar som:", sound.name, error);
    }
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

  public get sceneSound(): Record<string, Sound> {
    return this._sceneSounds;
  }

  public clearInterfaces(): void {
    Object.values(this._sceneInterface).forEach(item => {
      item.destroy();
    });
  }
}
