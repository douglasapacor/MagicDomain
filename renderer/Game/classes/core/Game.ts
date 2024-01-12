import { GameLoop, GameScene, masterEvents, resources } from "..";
import { gameDataInfoScene } from "../../scenes/gameDataInfoScene";
import { mainSceneConstructor } from "../../scenes/mainScene";
import { gameContainerSceneType } from "../../types/gameContainerSceneType";

export class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private loadedScene: gameContainerSceneType | null;
  private scenes: Record<string, GameScene>;
  private gameLoop: GameLoop;
  private viewEffects: {
    alpha: number;
    alphaChange: number;
    fade: "in" | "out";
  };

  constructor(canva: HTMLCanvasElement) {
    this.canvas = canva;
    this.context = this.canvas.getContext("2d");
    this.loadedScene = null;
    this.scenes = {};

    this.viewEffects = {
      alpha: 1,
      alphaChange: 0.05,
      fade: "out",
    };

    masterEvents.on("doFadeIn", this, () => (this.viewEffects.fade = "in"));
    masterEvents.on("doFadeOut", this, () => (this.viewEffects.fade = "out"));
  }

  private addSCENE = (name: string, scene: GameScene, load?: boolean) => {
    this.scenes[name] = scene;

    if (load)
      this.loadedScene = {
        name: name,
        scene: this.scenes[name],
      };
  };

  private loadSCENE = (name: string) => {
    this.loadedScene = {
      name: name,
      scene: this.scenes[name],
    };
  };

  private update = (delta) => {
    this.loadedScene.scene.stepEntry(delta, this.loadedScene.scene);
  };

  public loadGAME = () => {
    resources.loadResources();

    const { gameInfoScene } = gameDataInfoScene({
      canvasWidth: this.canvas.width,
      canvasHeigth: this.canvas.height,
    });

    this.addSCENE(gameInfoScene.name, gameInfoScene, true);

    const { mainScene, extras } = mainSceneConstructor({
      groundResource: resources.images.areaOne,
      playerResource: resources.images.player,
      canvasWidth: this.canvas.width,
      canvasHeigth: this.canvas.height,
    });

    this.addSCENE(mainScene.name, mainScene);

    setTimeout(() => {
      this.viewEffects.fade = "in";
      setTimeout(() => {
        this.loadSCENE(mainScene.name);
        this.viewEffects.fade = "out";
      }, 700);
    }, 5000);

    const draw = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.save();

      // this.context.translate(
      //   extras.camera.position.x,
      //   extras.camera.position.y
      // );

      if (this.viewEffects.fade === "out") {
        this.viewEffects.alpha += this.viewEffects.alphaChange;

        if (this.viewEffects.alpha >= 1) {
          this.viewEffects.alpha = 1;
        }
      }

      if (this.viewEffects.fade === "in") {
        this.viewEffects.alpha -= this.viewEffects.alphaChange;

        if (this.viewEffects.alpha < 0) {
          this.viewEffects.alpha = 0;
        }
      }

      this.context.globalAlpha = this.viewEffects.alpha;
      // this.context.fillStyle = "#000";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.loadedScene.scene.draw(this.context, 0, 0);

      this.context.restore();

      // extras.characterFrame.draw(this.context, 10, 10);
      // extras.miniMap.draw(this.context, this.canvas.width - 110, 100);
    };

    this.gameLoop = new GameLoop(this.update, draw);
    this.gameLoop.start();
  };
}
