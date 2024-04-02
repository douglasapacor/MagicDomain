import { GameObject } from "./GameObject";

export class Scene extends GameObject {
  protected hasPreLoadBeenCalled: boolean;
  public isPreLoading: boolean;

  constructor(name: string) {
    super(`${name}_scene`);
    this.hasPreLoadBeenCalled = false;
    this.isPreLoading = false;
  }

  public override stepEntry(delta: number): void {
    this.children.forEach(go => go.stepEntry(delta));

    if (!this.hasPreLoadBeenCalled) {
      this.hasPreLoadBeenCalled = true;
      this.isPreLoading = true;
      this.preLoad();
    } else if (this.hasPreLoadBeenCalled && !this.isPreLoading) {
      this.hasReadyBeenCalled = true;
    }

    if (!this.hasReadyBeenCalled) {
      this.ready();
      this.hasReadyBeenCalled = true;
    }

    this.step(delta);
  }

  public preLoad(): void {
    this.isPreLoading = false;
  }
}
