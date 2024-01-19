import { Loop, Scene } from "..";

export class Game {
  private loop: Loop;
  private scene: Scene | null;
  private scenes: Scene[];

  constructor() {
    this.loop = new Loop(this.update, this.draw);
    this.scene = null;
    this.scenes = [];
  }

  private update = (delta: number): void => {
    if (this.scene) this.scene.StepEntry(delta);
  };

  private draw = (): void => {
    console.log("draw");
  };

  public Start = (): void => {
    this.loop.Start();
  };
}
