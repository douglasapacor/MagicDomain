export class GameObject {
  private children: GameObject[];
  private parent: GameObject;
  private hasReadyBeenCalled: boolean;

  constructor() {
    this.children = [];
    this.parent = null;
    this.hasReadyBeenCalled = false;
  }

  stepEntry(delta, root) {
    this.children.forEach((child) => child.stepEntry(delta, root));

    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    this.step(delta);
  }

  private ready = () => {};

  private step = (deltaTime: number) => {};

  destroy() {
    this.children.forEach((child) => {
      child.destroy();
    });

    this.parent.removeChild(this);
  }

  addChild(gameObject: GameObject) {
    gameObject.parent = this;

    this.children.push(gameObject);
  }

  removeChild(gameObject: GameObject) {
    // events.unsubscribe(gameObject);

    this.children = this.children.filter((g) => {
      return gameObject !== g;
    });
  }
}
