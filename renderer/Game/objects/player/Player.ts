import {
  Animations,
  FrameIndexPattern,
  Sprite,
  Vector2,
  events,
} from "../../classes";
import { GameObject } from "../../classes/GameObject";
import { DOWN, LEFT, RIGHT, UP } from "../../classes/Input";
import { isSpaceFree } from "../../helpers/grid";
import { moveTowards } from "../../helpers/moveTowards";
import { walls } from "../../levels/level1";
import { resourceImagesType } from "../../types/resourceImages";
import {
  STAND_DOWN,
  STAND_LEFT,
  STAND_RIGHT,
  STAND_UP,
  WALK_DOWN,
  WALK_LEFT,
  WALK_RIGHT,
  WALK_UP,
} from "./playerAnimation";

export class Player extends GameObject {
  private body: Sprite;
  private facingDirection: string;
  private destinationPosition: Vector2;
  private lastX: number;
  private lastY: number;
  private speed: number;

  constructor(x: number, y: number, resource: resourceImagesType) {
    super(new Vector2(x, y));
    this.speed = 3.3;

    this.body = new Sprite({
      resource: resource,
      frameSize: new Vector2(64, 64),
      hFrames: 9,
      vFrames: 4,
      frame: 1,
      position: new Vector2(-8, -20),
      animations: new Animations({
        walkDown: new FrameIndexPattern(WALK_DOWN),
        walkUp: new FrameIndexPattern(WALK_UP),
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        walkRight: new FrameIndexPattern(WALK_RIGHT),
        standDown: new FrameIndexPattern(STAND_DOWN),
        standUp: new FrameIndexPattern(STAND_UP),
        standLeft: new FrameIndexPattern(STAND_LEFT),
        standRight: new FrameIndexPattern(STAND_RIGHT),
      }),
    });

    this.addChild(this.body);
    this.facingDirection = DOWN;
    this.destinationPosition = this.position.duplicate();
  }

  step(delta, root) {
    const distance = moveTowards(this, this.destinationPosition, this.speed);

    const hasArrived = distance <= 1;

    if (hasArrived) {
      this.tryMove(root);
    }

    this.tryEmitPosition();
  }

  tryEmitPosition() {
    if (this.lastX === this.position.x && this.lastY === this.position.y)
      return;

    this.lastX = this.position.x;
    this.lastY = this.position.y;

    events.emit("player_position", this.position);
  }

  tryMove(root) {
    const { input } = root;

    if (!input.direction) {
      if (this.facingDirection === LEFT) {
        this.body.animations.play("standLeft");
      }
      if (this.facingDirection === RIGHT) {
        this.body.animations.play("standRight");
      }
      if (this.facingDirection === UP) {
        this.body.animations.play("standUp");
      }
      if (this.facingDirection === DOWN) {
        this.body.animations.play("standDown");
      }

      return;
    }

    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;

    const gridSize = 16;

    if (input.direction === DOWN) {
      nextY += gridSize;
      this.body.animations.play("walkDown");
    }

    if (input.direction === UP) {
      nextY -= gridSize;
      this.body.animations.play("walkUp");
    }

    if (input.direction === LEFT) {
      nextX -= gridSize;
      this.body.animations.play("walkLeft");
    }

    if (input.direction === RIGHT) {
      nextX += gridSize;
      this.body.animations.play("walkRight");
    }

    this.facingDirection = input.direction ?? this.facingDirection;

    if (isSpaceFree(walls, nextX, nextY))
      this.destinationPosition = new Vector2(nextX, nextY);
  }
}
