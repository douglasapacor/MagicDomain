import { Scene } from "../lib/Scene";
import { UI } from "../lib/UI";

export class PresentationScene extends Scene {
  private properties: { width: number; heigth: number };

  constructor({ width, heigth }: { width: number; heigth: number }) {
    super("presentation");
    this.properties = {
      width: width,
      heigth: heigth,
    };
  }

  public AssembleScene(): void {
    const blackUi = new UI("blackBackground");

    blackUi.DrawImage = (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = "#212121";
      ctx.fillRect(0, 0, this.properties.width, this.properties.heigth);
    };

    this.addUI(blackUi);
  }
}
