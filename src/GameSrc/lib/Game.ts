import { Loop, Scene } from "..";
import { Html } from "./Html";

export class Game {
  private loop: Loop;
  private scene: Scene | null;
  private scenes: Scene[];
  private html: Html;

  constructor() {
    this.loop = new Loop(this.update, this.draw);
    this.scene = null;
    this.scenes = [];
    this.html = new Html();
  }

  private update = (delta: number): void => {
    if (this.scene) this.scene.StepEntry(delta);
  };

  private draw = (): void => {
    this.html.ctx.clearRect(
      0,
      0,
      this.html.canvas.width,
      this.html.canvas.height
    );

    this.html.ctx.save();

    // this.html.ctx.translate(camera.position.x, camera.position.y);

    this.scene.Draw(this.html.ctx, 0, 0);

    this.html.ctx.restore();
  };

  public Start = (): void => {
    this.loop.Start();
  };
}
