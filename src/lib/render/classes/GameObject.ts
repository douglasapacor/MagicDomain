import { generateKey } from "../helpers/randoms";
import { IGameObject } from "./Interfaces/IGameObject";
import { Vector2 } from "./Vector2";

export class GameObject implements IGameObject {
  public readonly name: string;
  public parent: GameObject | null;
  public children: GameObject[];
  public hasReadyBeenCalled: boolean;
  public isReady: boolean;
  public position: Vector2;

  constructor(name: string, position?: Vector2) {
    this.name = `${name}_${generateKey(5)}_gameobject`;
    this.children = [];
    this.position = position ? position : new Vector2(0, 0);
    this.hasReadyBeenCalled = false;
    this.isReady = false;
  }

  public stepEntry(delta: number): void {
    this.children.forEach(go => go.stepEntry(delta));

    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.isReady = true;
      this.ready();
    } else if (this.hasReadyBeenCalled && !this.isReady) this.step(delta);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public step(delta: number): void {}

  public ready(): void {
    this.isReady = false;
  }

  public draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.drawImage(ctx, drawPosX, drawPosY);
    this.children.forEach(go => go.draw(ctx, drawPosX, drawPosY));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {}

  public addChild(gameObject: GameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  public destroy() {
    this.children.forEach(child => {
      child.destroy();
    });
    this.parent.removeChild(this);
  }

  public removeChild(gameObject: GameObject) {
    this.children = this.children.filter(g => {
      return gameObject !== g;
    });
  }
}
