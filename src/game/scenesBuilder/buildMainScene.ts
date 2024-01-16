import { Camera, GameScene } from "../classes";
import { gridCells } from "../helpers/grid";
import { Player } from "../objects/player/Player";

const buildMainScene = (w: number, h: number): GameScene => {
  const mainScene = new GameScene("mainScene");
  const camera = new Camera(w, h);
  mainScene.addGameObject(camera);
  const player = new Player(gridCells(5), gridCells(6));
  mainScene.addGameObject(player);
  return mainScene;
};

export default buildMainScene;
