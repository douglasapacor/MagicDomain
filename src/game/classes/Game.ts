/* eslint-disable import/namespace */
import { resources } from ".";
import * as allScenes from "../scenes";
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

  constructor() {
    this.loadedScene = null;
    this.scenes = {};
    this.viewEffects = {
      alpha: 1,
      alphaChange: 0.05,
      fade: "out",
    };

    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");

    this.gameContainer = document.createElement("div");
    this.gameContainer.id = "GameContainer";
    this.gameContainer.appendChild(this.canvas);

    document.body.appendChild(this.gameContainer);

    Object.keys(allScenes).forEach((scn) => {
      this.scenes[scn] = allScenes[scn as keyof typeof allScenes];

      if (allScenes[scn as keyof typeof allScenes].isInitialScene)
        this.loadedScene = {
          name: allScenes[scn as keyof typeof allScenes].name,
          scene: allScenes[scn as keyof typeof allScenes],
        };
    });

    this.gameLoop = new GameLoop(this.update, this.draw);
  }

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
