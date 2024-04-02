import { GameObject } from "./GameObject";

export class Scene extends GameObject {
  public preLoadCalled: boolean;
  public preLoadFinished: boolean;
  private _isLoaded: boolean;

  constructor(name: string) {
    super(`${name}_scene`);
    this.preLoadCalled = false;
    this.preLoadFinished = false;
    this._isLoaded = false;
  }

  public override stepEntry(delta: number): void {
    this.children.forEach(go => go.stepEntry(delta));

    if (!this.preLoadCalled) {
      this.preLoadCalled = true;
      this.preLoad();
    }

    if (this.preLoadCalled && this.preLoadFinished)
      if (!this.readyCalled) {
        this.readyCalled = true;
        this.ready();
      }

    if (
      this.preLoadCalled &&
      this.preLoadFinished &&
      this.readyCalled &&
      this.readyFinished
    )
      this._isLoaded = true;

    if (this._isLoaded) this.step(delta);
  }

  public preLoad(): void {
    this.preLoadFinished = true;
  }

  public get isLoaded(): boolean {
    return this._isLoaded;
  }
}
