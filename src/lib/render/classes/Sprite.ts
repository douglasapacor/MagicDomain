import { Animation } from "./Animation";
import { GameObject } from "./GameObject";
import { Vector2 } from "./Vector2";
import { resourceTypes } from "./types/resourceTypes";
import { spriteConstructor } from "./types/spriteConstructor";

export class Sprite extends GameObject {
  public resource: resourceTypes;
  public frameSize: Vector2;
  public hFrames: number;
  public vFrames: number;
  public frame: number;
  public frameMap: Map<number, Vector2>;
  public scale: number;
  public animations: Animation | null;

  constructor({
    resource,
    name,
    frameSize,
    hFrames,
    vFrames,
    frame,
    scale,
    position,
    animations,
  }: spriteConstructor) {
    super(`${name}_sprite`, position);
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16, 16);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.frameMap = new Map();
    this.scale = scale ?? 1;
    this.animations = animations ?? null;

    this.buildFrameMap();
  }

  private buildFrameMap() {
    let frameCount = 0;
    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          new Vector2(this.frameSize.x * h, this.frameSize.y * v),
        );
        frameCount++;
      }
    }
  }

  public override Step(delta: number) {
    if (!this.animations) {
      return;
    }
    this.animations.Step(delta);
    this.frame = this.animations.frame;
  }

  public override drawImage(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
  ): void {
    if (!this.resource.isLoaded) {
      return;
    }

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
      frameSizeY * this.scale,
    );
  }
}
