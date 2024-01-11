import { GameScene } from "../classes";
import { GameInfo } from "../objects/gameInfo/GameInfo";
import { sceneConstructor } from "../types/sceneCronstructor";

export const gameDataInfoScene: sceneConstructor<{
  canvasWidth: number;
  canvasHeigth: number;
}> = ({ ...props }) => {
  const gameInfoScene = new GameScene("game_data_info_scene");

  const gameInfo = new GameInfo({
    width: props.canvasWidth,
    heigth: props.canvasHeigth,
  });

  gameInfoScene.addChild(gameInfo);

  return {
    gameInfoScene,
  };
};
