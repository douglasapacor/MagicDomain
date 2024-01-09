import { resourceImagesType } from "../types/resourceImagesType";
import { Animations } from "./Animations";
import { GameObject } from "./GameObject";
import { Vector2 } from "./Vector2";

export class Sprite extends GameObject {
  private resource: resourceImagesType;
  private frameSize: Vector2;
  private hFrames: number;
  private vFrames: number;
  private frame: number;
  private frameMap: Map<number, Vector2>;
  private scale: number;
  public animations: Animations;

  constructor({
    position = null,
    resource,
    frameSize = null,
    hFrames = null,
    vFrames = null,
    frame = null,
    scale = null,
    animations = null,
    name = "",
  }) {
    super(position ?? new Vector2(0, 0), name);
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16, 32);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.frameMap = new Map();
    this.scale = scale ?? 1;
    this.animations = animations ?? null;
    this.buildFrameMap();
  }

  buildFrameMap() {
    let frameCount = 0;
    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          new Vector2(this.frameSize.x * h, this.frameSize.y * v)
        );
        frameCount++;
      }
    }
  }

  step(delta) {
    if (!this.animations) {
      return;
    }
    this.animations.step(delta);
    this.frame = this.animations.frame;
  }

  drawImage(ctx, x, y) {
    if (!this.resource.isLoaded) {
      return;
    }

    // Find the correct sprite sheet frame to use
    let frameCoordX = 0;
    let frameCoordY = 0;
    const frame = this.frameMap.get(this.frame);
    if (frame) {
      frameCoordX = frame.x;
      frameCoordY = frame.y;
    }

    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;

    ctx.drawImage(
      this.resource.image,
      frameCoordX,
      frameCoordY,
      frameSizeX,
      frameSizeY,
      x,
      y,
      frameSizeX * this.scale,
      frameSizeY * this.scale
    );
  }
}
