/* eslint-disable import/namespace */
import { resources } from ".";
import buildCompanyLogoScene from "../scenesBuilder/buildCompanyLogoScene";
import buildGameInfoScene from "../scenesBuilder/buildGameinfoScene";
import buildMainScene from "../scenesBuilder/buildMainScene";
import { gameContainerSceneType } from "../types/gameContainerSceneType";
import { viewEffectsType } from "../types/viewEffectsType";
import { GameLoop } from "./GameLoop";
import { GameScene } from "./GameScene";

export class Game {
  private gameLoop: GameLoop;
  private gameContainer: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private viewEffects: viewEffectsType;
  private loadedScene: gameContainerSceneType | null;
  private scenes: Record<string, GameScene>;
  private resolution: { width: number; height: number };
  private version: string;

  constructor() {
    this.loadedScene = null;
    this.scenes = {};
    this.viewEffects = {
      alpha: 1,
      alphaChange: 0.05,
      fade: "out",
    };
    this.resolution = { width: 1280, height: 720 };
    this.version = "v0.0.1";

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.resolution.width;
    this.canvas.height = this.resolution.height;
    this.context = this.canvas.getContext("2d");

    this.gameContainer = document.createElement("div");
    this.gameContainer.id = "GameContainer";
    this.gameContainer.appendChild(this.canvas);

    document.body.appendChild(this.gameContainer);

    this.loadScenes();

    this.gameLoop = new GameLoop(this.update, this.draw);

    this.initiateGame();
  }

  private initiateGame = () => {
    setTimeout(() => {
      this.viewEffects.fade = "in";

      setTimeout(() => {
        const gc = this.loadScene("companyLogoScene");

        this.loadedScene = {
          name: gc.name,
          scene: gc,
        };

        setTimeout(() => {
          this.viewEffects.fade = "out";

          const mc = this.loadScene("mainScene");

          setTimeout(() => {
            this.viewEffects.fade = "in";

            setTimeout(() => {
              this.loadedScene = {
                name: mc.name,
                scene: mc,
              };

              setTimeout(() => {
                this.viewEffects.fade = "out";
              }, 1000);
            }, 2000);
          }, 5000);
        }, 1000);
      }, 2000);
    }, 5000);
  };

  private loadScene = (sceneName: string): GameScene => {
    return this.scenes[sceneName];
  };

  private loadScenes = () => {
    this.scenes.gameInfoScene = buildGameInfoScene(
      this.canvas.width,
      this.canvas.height
    );

    this.scenes.companyLogoScene = buildCompanyLogoScene(
      this.canvas.width,
      this.canvas.height
    );

    this.scenes.mainScene = buildMainScene(
      this.canvas.width,
      this.canvas.height
    );

    Object.keys(this.scenes).forEach((scn) => {
      if (this.scenes[scn].isInitialScene) {
        this.loadedScene = {
          name: this.scenes[scn].name,
          scene: this.scenes[scn],
        };
      }
    });
  };

  private update = (delta: number) => {
    if (this.loadedScene)
      this.loadedScene.scene.stepEntry(delta, this.loadedScene.scene);
  };

  private draw = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.save();

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

    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.loadedScene) this.loadedScene.scene.draw(this.context, 0, 0);

    this.context.restore();
  };

  public StartGame = (): void => {
    resources.loadResources();

    this.gameLoop.start();
  };
}
