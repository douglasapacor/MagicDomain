import { GameObject } from "../GameObject";
import { Vector2 } from "../Vector2";

export interface IGameObject {
  readonly name?: string;
  parent: GameObject | null;
  children: GameObject[];
  hasReadyBeenCalled: boolean;
  position: Vector2;

  StepEntry: (delta: number) => void;
  Step: (delta: number) => void;
  Ready: () => void;
  Draw: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
  DrawImage: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
  addChild(gameObject: GameObject): void;
  destroy(): void;
  removeChild(gameObject: GameObject): void;
}
