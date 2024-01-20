import { gameEvents } from "..";
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

    gameEvents.on("player_position", this, (playerPosition: Vector2) => {
      const halfWidth = -this.halfSize + this.canvasWidth / 2;
      const halfHeight = -this.halfSize + this.canvasHeight / 2;
      this.position = new Vector2(
        -playerPosition.x + halfWidth,
        -playerPosition.y + halfHeight
      );
    });
  }
}
