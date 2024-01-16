import { Dimension, GameScene, UI, Vector2 } from "../classes";

const gameInfoScene = new GameScene();
gameInfoScene.isInitialScene = true;
const ui = new UI("backgroundUI", new Vector2(0, 0), new Dimension(100, 100));
gameInfoScene.addUI(ui);

export default gameInfoScene;
