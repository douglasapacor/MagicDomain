import { Vector2 } from "./Vector2";

export class Sprite {
  private resource: { image: HTMLImageElement; isLoaded: boolean };
  private framseSize: Vector2;
  private hFrames: number;
  private vFrames: number;
  private frame: number;
  private frameMap: Map<number, { x: number; y: number }>;
  private scale: number;
  private position: Vector2;

  constructor(params: {
    resource: any;
    framseSize: Vector2;
    hFrame?: number;
    vFrame?: number;
    frame?: number;
    scale?: number;
    position: Vector2;
  }) {
    this.resource = params.resource;
    this.framseSize = params.framseSize ?? new Vector2(16, 16);
    this.hFrames = params.hFrame ?? 1;
    this.vFrames = params.vFrame ?? 1;
    this.frame = params.frame ?? 0;
    this.frameMap = new Map<number, { x: number; y: number }>();
    this.scale = params.scale ?? 1;
    this.position = params.position ?? new Vector2(0, 0);

    this.buildFrameMap();
  }

  private buildFrameMap = () => {
    let frameCount = 0;

    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          new Vector2(this.framseSize.x * h, this.framseSize.y * v)
        );
        frameCount++;
      }
    }
  };

  public draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    if (!this.resource.isLoaded) {
      return;
    }

    let frameCoordX = 0;
    let frameCoordy = 0;

    const frame = this.frameMap.get(this.frame);

    if (frame) {
      frameCoordX = frame.x;
      frameCoordy = frame.y;
    }

    let frameSizeX = this.framseSize.x;
    let frameSizey = this.framseSize.y;

    ctx.drawImage(
      this.resource.image,
      frameCoordX,
      frameCoordy,
      frameSizeX,
      frameSizey,
      x,
      y,
      frameSizeX * this.scale,
      frameSizey * this.scale
    );
  }
}
