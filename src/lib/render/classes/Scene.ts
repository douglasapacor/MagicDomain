import { GameObject } from "./GameObject";

export class Scene extends GameObject {
  protected hasPreLoadBeenCalled: boolean;
  public isLoaded: boolean;

  constructor(name: string) {
    super(`${name}_scene`);
    this.hasPreLoadBeenCalled = false;
    this.isLoaded = false;
  }

  public override stepEntry(delta: number): void {
    this.children.forEach(go => go.stepEntry(delta));

    if (!this.hasPreLoadBeenCalled) {
      this.hasPreLoadBeenCalled = true;
      this.preLoad();
    }

    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();

      this.isLoaded = true;
    }

    this.step(delta);
  }

  public preLoad(): void {}
}
