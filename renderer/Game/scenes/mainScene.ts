import { Camera, GameScene, Input, Sprite, Vector2 } from "../classes";
import { gridCells } from "../helpers/grid";
import { CharacterFrame } from "../objects/characterFrame/CharacterFrame";
import { MiniMap } from "../objects/miniMap/MiniMap";
import { Player } from "../objects/player/Player";
import { resourceImagesType } from "../types/resourceImagesType";
import { sceneConstructor } from "../types/sceneCronstructor";

export const mainSceneConstructor: sceneConstructor<{
  groundResource: resourceImagesType;
  playerResource: resourceImagesType;
  canvasWidth: number;
  canvasHeigth: number;
}> = ({ ...props }) => {
  const scene = new GameScene("main_scene");

  const ground = new Sprite({
    resource: props.groundResource,
    frameSize: new Vector2(480, 320),
  });

  scene.addChild(ground);

  const player = new Player(gridCells(6), gridCells(5), props.playerResource);

  scene.addChild(player);

  const camera = new Camera(props.canvasWidth, props.canvasHeigth);

  scene.addChild(camera);

  scene.input = new Input();

  return {
    scene,
    extras: {
      camera,
      characterFrame: new CharacterFrame(),
      miniMap: new MiniMap(),
    },
  };
};
