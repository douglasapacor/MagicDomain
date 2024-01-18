import { GameLoop } from "./GameLoop";
import { Html } from "./Html";
import { Scene } from "./Scene";

export class Game {
  private loop: GameLoop;
  private scene: Scene | null;
  private scenes: Record<string, Scene>;
  private html: Html;

  constructor() {
    this.html = new Html();
    this.loop = new GameLoop(this.update, this.draw);
    this.scene = null;
    this.scenes = {
      gameInformation: new Scene("gameInformation"),
      loading: new Scene("loading"),
      studio: new Scene("studio"),
      security: new Scene("security"),
      character: new Scene("character"),
      main: new Scene("main"),
    };
  }

  private loadScene(sceneName: string) {
    const gameScene = this.scenes[sceneName as keyof typeof this.scene];

    if (!gameScene) return;

    this.scene = null;
    this.scene = gameScene;
  }

  private update = (delta: number) => {
    if (this.scene) this.scene.StepEntry(delta, this.scene);
  };

  private draw = () => {
    this.html.context.clearRect(
      0,
      0,
      this.html.canva.width,
      this.html.canva.height
    );
    this.html.context.save();
    this.html.context.fillRect(
      0,
      0,
      this.html.canva.width,
      this.html.canva.height
    );

    if (this.scene) this.scene.Draw(this.html.context, 0, 0);

    this.html.context.restore();
  };

  public Start = () => {
    this.loop.start();
  };
}
