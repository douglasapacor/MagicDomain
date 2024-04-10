import { gameEvents } from "..";
import { GAME_EVENTS } from "../../../statics/eventlist";
import { GameObject } from "./GameObject";

export class Scene extends GameObject {
  public preLoadCalled: boolean;
  private _allowFinishPreload: boolean;
  private _realeseadPreLoadFinish: boolean;
  public preLoadFinished: boolean;
  private _isLoaded: boolean;
  private _isLoading: boolean;

  constructor(name: string) {
    super(`${name}_scene`);
    this.preLoadCalled = false;
    this._allowFinishPreload = false;
    this._realeseadPreLoadFinish = false;
    this.preLoadFinished = false;
    this._isLoaded = false;
    this._isLoading = false;
  }

  public override stepEntry(delta: number): void {
    this.children.forEach(go => go.stepEntry(delta));

    if (!this.preLoadCalled) {
      this._isLoading = true;
      this.preLoadCalled = true;
      this.preLoad();
      this._allowFinishPreload = true;
    }

    if (this._allowFinishPreload) {
      this.preLoadStepVerification();
      if (this._realeseadPreLoadFinish) {
        this._allowFinishPreload = false;
        this.preLoadFinished = true;
      }
    }

    if (this.preLoadCalled && this.preLoadFinished) {
      if (!this.readyCalled) {
        this.readyCalled = true;
        this.ready();
      }
    }

    if (
      this.preLoadCalled &&
      this.preLoadFinished &&
      this.readyCalled &&
      this.readyFinished
    )
      this._isLoading = false;

    if (
      this.preLoadCalled &&
      this.preLoadFinished &&
      this.readyCalled &&
      this.readyFinished &&
      !this._isLoading
    ) {
      this._isLoaded = true;
    }

    if (this._isLoaded) this.step(delta);
  }

  protected realeasePreLoad(): void {
    this._realeseadPreLoadFinish = true;
  }

  protected preLoadStepVerification(): void {}

  public moveToScene = (sceneName: string): void => {
    gameEvents.emit(GAME_EVENTS.CHANGE_SCENE, sceneName);
  };

  public preLoad(): void {
    this.preLoadFinished = true;
  }

  public get isLoaded(): boolean {
    return this._isLoaded;
  }

  public get isLoading(): boolean {
    return this._isLoading;
  }
}
