import { Camera, GameScene, Input, Sprite, Vector2 } from "../classes";
import { gridCells } from "../helpers/grid";
import { Player } from "../objects/player/Player";
import { resourceImagesType } from "../types/resourceImagesType";
import { sceneConstructor } from "../types/sceneCronstructor";

export const mainSceneConstructor: sceneConstructor<{
  groundResource: resourceImagesType;
  playerResource: resourceImagesType;
  canvasWidth: number;
  canvasHeigth: number;
}> = ({ ...props }) => {
  const mainScene = new GameScene("main_scene");

  const ground = new Sprite({
    resource: props.groundResource,
    frameSize: new Vector2(480, 320),
  });

  mainScene.addChild(ground);

  const player = new Player(gridCells(6), gridCells(5), props.playerResource);

  mainScene.addChild(player);

  const camera = new Camera(props.canvasWidth, props.canvasHeigth);

  mainScene.addChild(camera);

  mainScene.input = new Input();

  return {
    mainScene: mainScene,
    camera,
  };
};
