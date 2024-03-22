import { GameObject } from "./GameObject";

export class Scene extends GameObject {
  public hasPreLoadBeenCalled: boolean;

  constructor(name: string) {
    super(`${name}_scene`);
    this.hasPreLoadBeenCalled = false;
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
  }

  public preLoad(): void {}
}
