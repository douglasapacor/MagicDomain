import { Resource } from "../lib/render/classes/Resource";
import { Scene } from "../lib/render/classes/Scene";
const SCENE_NAME = "StudioScene";

export class StudioScene extends Scene {
  constructor() {
    super(SCENE_NAME);
    this.AddResource(new Resource("eq_logo", "images"));
  }

  public override ready(): void {
    this._readyComplete = true;
  }

  public override drawImage(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
  ): void {
    ctx.translate(0, 0);

    const clintWidth = ctx.canvas.clientWidth / 2;
    const clintHeight = ctx.canvas.clientHeight / 2;
    const imgWith = this.sceneResource["eq_logo"].image.width / 2;
    const imgHeight = this.sceneResource["eq_logo"].image.height / 2;

    const width = parseInt((clintWidth - imgWith).toFixed(0));
    const height = parseInt((clintHeight - imgHeight).toFixed(0));

    const newX = this.position.x + x + width;
    const newY = this.position.y + y + height;

    ctx.fillStyle = "red";
    ctx.font = "16pt";

    ctx.fillText(`client W: ${ctx.canvas.clientWidth}`, 30, 50);
    ctx.fillText(`client H: ${ctx.canvas.clientHeight}`, 30, 60);
    ctx.fillText(
      `image width: ${this.sceneResource["eq_logo"].image.width}`,
      30,
      70,
    );
    ctx.fillText(
      `image height: ${this.sceneResource["eq_logo"].image.height}`,
      30,
      80,
    );
    ctx.fillText(`clintWidth / 2 = ${clintWidth}`, 30, 90);
    ctx.fillText(`clintHeight / 2 = ${clintHeight}`, 30, 100);
    ctx.fillText(`imgWith / 2 = ${imgWith}`, 30, 110);
    ctx.fillText(`imgHeight / 2 = ${imgHeight}`, 30, 120);
    ctx.fillText(`clintWidth - imgWith = ${clintWidth - imgWith}`, 30, 130);
    ctx.fillText(
      `clintHeight - imgHeight = ${clintHeight - imgHeight}`,
      30,
      140,
    );
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, newX, 10);
    ctx.fillStyle = "green";
    ctx.fillRect(newX - 10, 10, 10, newY - 10);
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, ctx.canvas.clientWidth, 5);
    ctx.fillStyle = "white";
    ctx.fillRect(ctx.canvas.clientWidth, 0, 10, 50);
    ctx.drawImage(this.sceneResource["eq_logo"].image, newX, newY);
  }
}

