import { Scene } from "../lib/Scene";
import { UI } from "../lib/UI";

export class StudioScene extends Scene {
  private properties: { width: number; heigth: number };
  constructor({ width, heigth }: { width: number; heigth: number }) {
    super("studio");

    this.properties = {
      width: width,
      heigth: heigth,
    };
  }

  public AssembleScene(): void {
    const ui = new UI();

    ui.DrawImage = (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = "#212121";
      ctx.fillRect(0, 0, this.properties.width, this.properties.heigth);
    };

    this.addUI(ui);
  }
}
