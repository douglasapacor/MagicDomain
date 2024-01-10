import { GameScene } from "../classes";
import { sceneConstructor } from "../types/sceneCronstructor";

export const gameDataInfoScene: sceneConstructor<{}> = ({ ...props }) => {
  const scene = new GameScene("game_data_info_scene");
  return {
    scene,
  };
};
