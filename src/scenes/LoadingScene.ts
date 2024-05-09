import { Scene } from "../../src/lib/render";
import { GAME_EVENTS } from "../../src/statics/eventlist";

const SCENE_NAME = "LoadingScene";

export class LoadingScene extends Scene {
  private loadedValue = 0;
  private loadedTarget = 0;
  private finalWidthValue = 0;
  private barWidth = 0;
  private barHeight = 35;
  private barX = 0;
  private barY = 0;

  constructor() {
    super(SCENE_NAME);

    window.bridge.on(
      GAME_EVENTS.UPDATE_LOADING,
      (_, data: { value: number }) => {
        this.loadedTarget = data.value;
      },
    );
  }

  public drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.translate(0, 0);

    this.barWidth = (ctx.canvas.width / 100) * 85;

    if (this.loadedTarget > this.loadedValue) {
      this.loadedValue = this.loadedValue + 1;

      const verify = (this.barWidth / 100) * this.loadedValue - 16;

      if (verify <= 0) this.finalWidthValue = 0;
      else this.finalWidthValue = verify;
    }

    this.barX = (ctx.canvas.width - this.barWidth) / 2;
    this.barY = (ctx.canvas.height / 100) * 75;

    ctx.fillStyle = "#52796f";
    ctx.beginPath();
    ctx.roundRect(this.barX, this.barY, this.barWidth, this.barHeight, 6);
    ctx.fill();

    ctx.fillStyle = "#cad2c5";
    ctx.beginPath();
    ctx.roundRect(
      this.barX + 3,
      this.barY + 3,
      this.barWidth - 6 <= 0 ? 0 : this.barWidth - 6,
      this.barHeight - 6 <= 0 ? 0 : this.barHeight - 6,
      4,
    );
    ctx.fill();

    ctx.fillStyle = "#52796f";
    ctx.beginPath();
    ctx.roundRect(
      this.barX + 5,
      this.barY + 5,
      this.barWidth - 10 <= 0 ? 0 : this.barWidth - 10,
      this.barHeight - 10 <= 0 ? 0 : this.barHeight - 10,
      4,
    );
    ctx.fill();

    ctx.fillStyle = "#cad2c5";
    ctx.beginPath();
    ctx.roundRect(
      this.barX + 8,
      this.barY + 8,
      this.finalWidthValue,
      this.barHeight - 16 <= 0 ? 0 : this.barHeight - 16,
      4,
    );
    ctx.fill();
  }
}

