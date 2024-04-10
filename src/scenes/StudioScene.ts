import { resources } from "../../src/lib/render";
import { Scene } from "../lib/render/classes/Scene";

const SCENE_NAME = "StudioScene";

export class StudioScene extends Scene {
  constructor() {
    super(SCENE_NAME);
  }

  public override preLoad(): void {
    resources.loadResourceByName("eq_logo");
  }

  protected override preLoadStepVerification(): void {
    if (resources.images["eq_logo"]) {
      if (resources.images["eq_logo"].isLoaded) {
        this.realeasePreLoad();
      }
    }
  }

  public override ready(): void {
    this.readyFinished = true;
  }

  public override drawImage(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
  ): void {
    ctx.translate(0, 0);

    const width = parseInt((ctx.canvas.clientWidth / 13).toFixed(0));
    const newX = this.position.x + x + width;
    const newY = this.position.y + y + 0;

    ctx.drawImage(resources.images["eq_logo"].image, newX, newY);
  }
}

