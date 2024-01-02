/**
 * Game Object Class
 * @fileoverview A Generic game class used like core for all other game classes.
 * @author Douglas Pacor
 * @version 1.0.0
 */
export class GameObject {
  private children: GameObject[];
  private parent: GameObject;
  private hasReadyBeenCalled: boolean;

  constructor() {
    this.children = [];
    this.parent = null;
    this.hasReadyBeenCalled = false;
  }

  public stepEntry(delta: number, root: GameObject) {
    this.children.forEach((child) => child.stepEntry(delta, root));

    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    this.step(delta);
  }

  private ready = () => {};

  private step = (deltaTime: number) => {};

  public destroy = () => {
    this.children.forEach((child) => {
      child.destroy();
    });

    this.parent.removeChild(this);
  };

  public addChild = (gameObject: GameObject) => {
    gameObject.parent = this;
    this.children.push(gameObject);
  };

  public removeChild = (gameObject: GameObject) => {
    this.children = this.children.filter((g) => {
      return gameObject !== g;
    });
  };
}
