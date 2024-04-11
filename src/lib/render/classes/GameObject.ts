/* eslint-disable @typescript-eslint/no-unused-vars */
import { generateKey } from "../helpers/randoms";
import { Vector2 } from "./Vector2";

export class GameObject {
  private readonly _name: string;
  private _parent: GameObject | null = null;
  private _children: GameObject[];
  protected _position: Vector2;
  protected _readyStarted: boolean;
  protected _readyComplete: boolean;

  constructor(name: string, position?: Vector2) {
    this._name = `${name}_${generateKey(5)}_gameobject`;
    this._children = [];
    this._position = position ? position : new Vector2(0, 0);
    this._readyStarted = false;
    this._readyComplete = false;
  }

  public StepEntry(delta: number): void {
    this._children.forEach(go => go.StepEntry(delta));

    if (!this._readyStarted) {
      this._readyStarted = true;
      this.ready();
    }

    if (this._readyStarted && this._readyComplete) {
      this.Step(delta);
    }
  }

  public Step(delta: number): void {}

  public ready(): void {
    this._readyComplete = true;
  }

  public draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    const drawPosX = x + this._position.x;
    const drawPosY = y + this._position.y;

    this.drawImage(ctx, drawPosX, drawPosY);
    this._children.forEach(go => go.draw(ctx, drawPosX, drawPosY));
  }

  public drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {}

  protected addChild(gameObject: GameObject) {
    gameObject._parent = this;
    this._children.push(gameObject);
  }

  protected destroy() {
    this._children.forEach(child => {
      child.destroy();
    });
    this._parent.removeChild(this);
  }

  protected removeChild(gameObject: GameObject) {
    this._children = this._children.filter(g => {
      return gameObject !== g;
    });
  }

  public get name(): string {
    return this._name;
  }

  public get position(): Vector2 {
    return this._position;
  }

  public set position(pos: Vector2) {
    this._position = pos;
  }

  public get children(): GameObject[] {
    return this._children;
  }
}
