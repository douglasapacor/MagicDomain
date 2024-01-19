import { Vector2 } from "./Vector2";

export class Camera {
  private halfSize: number;
  private canvasWidth: number;
  private canvasHeight: number;
  public position: Vector2;

  constructor(halfSize: number, canvasWidth: number, canvasHeight: number) {
    this.position = new Vector2(0, 0);
    this.halfSize = halfSize;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }
}
