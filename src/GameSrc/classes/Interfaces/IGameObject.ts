import { GameObject } from "../GameObject";
import { Vector2 } from "../Vector2";

export interface IGameObject {
  readonly name?: string;
  parent: GameObject | null;
  children: GameObject[];
  hasReadyBeenCalled: boolean;
  position: Vector2;
  stepEntry(delta: number): void;
  step(delta: number): void;
  ready(): void;
  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void;
  drawImage: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
  addChild(gameObject: GameObject): void;
  destroy(): void;
  removeChild(gameObject: GameObject): void;
}

