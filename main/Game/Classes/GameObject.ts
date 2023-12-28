import { Vector2 } from "../../../renderer/Game/Classes/Vector2";

export class GameObject {
  private position: Vector2;
  private children: GameObject[];
  private parent: GameObject;
  private hasReadyBeenCalled: boolean;

  constructor(position?: Vector2) {
    this.position = position ?? new Vector2(0, 0);
    this.children = [];
    this.parent = null;
    this.hasReadyBeenCalled = false;
  }

  stepEntry(delta, root) {
    // Call updates on all children first
    this.children.forEach((child) => child.stepEntry(delta, root));

    // Call ready on the first frame
    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    // Call any implemented Step code
    this.step(delta);
  }

  private ready = () => {};

  private step = (_delta) => {};
}
