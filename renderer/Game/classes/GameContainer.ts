import { GameLoop, GameScene, Resources } from ".";
import { mainSceneConstructor } from "../scenes/mainScene";
import { staticResources } from "../statics/resources";
import { gameContainerSceneType } from "../types/gameContainerSceneType";

export class GameContainer {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private loadedScene: gameContainerSceneType | null;
  private scenes: Record<string, GameScene>;
  private gameLoop: GameLoop;

  constructor(canva: HTMLCanvasElement) {
    this.canvas = canva;
    this.context = this.canvas.getContext("2d");
    this.loadedScene = null;
    this.scenes = {};
  }

  addSCENE = (name: string, scene: GameScene, load?: boolean) => {
    this.scenes[name] = scene;

    if (load)
      this.loadedScene = {
        name: name,
        scene: this.scenes[name],
      };
  };

  loadSCENE = (name: string) => {
    this.loadedScene = {
      name: name,
      scene: this.scenes[name],
    };
  };

  loadGAME = () => {
    const resources = new Resources(staticResources);

    const { scene, extras } = mainSceneConstructor({
      groundResource: resources.images.areaOne,
      playerResource: resources.images.player,
      canvasWidth: this.canvas.width,
      canvasHeigth: this.canvas.height,
    });

    this.addSCENE(scene.name, scene, true);

    const update = (delta) => {
      this.loadedScene.scene.stepEntry(delta, this.loadedScene.scene);
    };

    const draw = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.context.save();

      this.context.translate(
        extras.camera.position.x,
        extras.camera.position.y
      );

      this.loadedScene.scene.draw(this.context, 0, 0);

      this.context.restore();

      extras.characterFrame.draw(this.context, 10, 10);
      extras.miniMap.draw(this.context, this.canvas.width - 110, 100);
    };

    this.gameLoop = new GameLoop(update, draw);
    this.gameLoop.start();
  };
}
