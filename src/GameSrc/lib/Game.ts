import { Camera, Html, Loop, Scene, gameEvents } from "..";
import { PresentationScene } from "../scenes/PresentationScene";

export class Game {
  private loop: Loop;
  private scene: Scene | null;
  private scenes: Scene[];
  private html: Html;
  private camera: Camera | null;

  constructor() {
    this.loop = new Loop(this.update, this.draw);
    this.scene = null;
    this.scenes = [];
    this.camera = null;
    this.html = new Html();

    this.scenes.push(
      new PresentationScene({
        width: this.html.canvas.width,
        heigth: this.html.canvas.height,
      })
    );

    gameEvents.on("unload_scene", this, () => {
      this.scene = null;
    });

    gameEvents.on("set_cam_scene", this, () => {
      if (!this.camera)
        this.camera = new Camera(
          32,
          this.html.canvas.width,
          this.html.canvas.height
        );
    });

    gameEvents.on("unset_cam_scene", this, () => {
      if (this.camera) this.camera = null;
    });
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

    if (this.camera)
      this.html.ctx.translate(this.camera.position.x, this.camera.position.y);

    if (this.scene) this.scene.Draw(this.html.ctx, 0, 0);

    this.html.ctx.restore();
  };

  public Start = (): void => {
    this.loop.Start();
  };
}
