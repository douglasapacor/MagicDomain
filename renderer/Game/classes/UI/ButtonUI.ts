import { Dimension } from "../core/Dimension";
import { Vector2 } from "../core/Vector2";
import { UI } from "./UI";

export class ButtonUI extends UI {
  public text: string;
  public fillColor: string;
  public textColor: string;
  public onClick?: () => void;

  constructor(
    text: string,
    fillColor: string,
    textColor: string,
    dimension?: Dimension,
    position?: Vector2
  ) {
    super(position, dimension);
    this.text = text;
    this.fillColor = fillColor;
    this.textColor = textColor;
  }

  inBounds(mouseX: number, mouseY: number): boolean {
    return !(
      mouseX < this.position.x ||
      mouseX > this.position.x + this.dimension.width ||
      mouseY < this.position.y ||
      mouseY > this.position.y + this.dimension.height
    );
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    // draw the button body
    ctx.fillStyle = this.fillColor;
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.dimension.width,
      this.dimension.height
    );
    // draw the button text
    ctx.textBaseline = "middle";
    ctx.font = "18px arial";
    ctx.textAlign = "center";
    ctx.fillStyle = this.textColor;
    ctx.fillText(
      this.text,
      this.position.x + this.dimension.width / 2,
      this.position.y + this.dimension.height / 2,
      this.dimension.width
    );
  }
}
