import { GameObject } from "./GameObject";

export class Scene extends GameObject {
  protected hasPreLoadBeenCalled: boolean;
  protected hasPosLoadBeenCalled: boolean;
  protected isLoaded: boolean;

  constructor(name: string) {
    super(`${name}_scene`);
    this.hasPreLoadBeenCalled = false;
    this.hasPosLoadBeenCalled = false;
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
    }

    this.step(delta);

    if (!this.hasPosLoadBeenCalled) {
      this.hasPosLoadBeenCalled = true;
      this.isLoaded = true;
    }
  }

  public preLoad(): void {}
}
