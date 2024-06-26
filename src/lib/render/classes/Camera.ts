import { gameEvents } from "..";
import { Vector2 } from "./Vector2";

export class Camera {
  private halfSize: number;
  private canvasWidth: number;
  private canvasHeight: number;
  private target: Vector2 | null;
  private _position: Vector2;

  constructor(halfSize: number, canvasWidth: number, canvasHeight: number) {
    this.halfSize = halfSize;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.target = null;
    this._position = new Vector2(0, 0);

    gameEvents.on("player_position", this, (playerPosition: Vector2) => {
      this.FollowTarget(playerPosition);
    });
  }

  public FollowTarget(target: Vector2) {
    this.target = target;
    this.updatePosition();
  }

  private updatePosition() {
    if (this.target) {
      const halfWidth = -this.halfSize + this.canvasWidth / 2;
      const halfHeight = -this.halfSize + this.canvasHeight / 2;

      if (
        !this._position.equals(
          (this._position = new Vector2(
            -this.target.x + halfWidth,
            -this.target.y + halfHeight,
          )),
        )
      ) {
        // if (mapProvider.mapIsLoaded) {
        //   const mapDimensions = mapProvider.getDimensions;
        // const clampedX = Math.max(this.position.x, 0);
        // const clampedXMax = Math.min(
        //   clampedX,
        //   mapDimensions.x - this.canvasWidth,
        // );
        // // const clampedY = Math.max(this.position.y, 0);
        // const clampedYMax = Math.min(
        //   mapDimensions.y - this.canvasHeight,
        //   this.position.y,
        // );
        // this.position = new Vector2(clampedXMax, clampedYMax);
        // gameEvents.emit("camera_moved", this.position);
        // }
      }
    }
  }

  public get position(): Vector2 {
    return this._position;
  }
}
