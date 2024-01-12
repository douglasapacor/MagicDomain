import { events } from "..";
import { GameObject } from "./GameObject";
import { Vector2 } from "./Vector2";

export class Camera extends GameObject {
  private personHalf: number;
  private canvasWidth: number;
  private canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    super();

    this.personHalf = 32;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    events.on("player_position", this, (heroPosition) => {
      const halfWidth = -this.personHalf + this.canvasWidth / 2;
      const halfHeight = -this.personHalf + this.canvasHeight / 2;
      this.position = new Vector2(
        -heroPosition.x + halfWidth,
        -heroPosition.y + halfHeight
      );
    });
  }
}
