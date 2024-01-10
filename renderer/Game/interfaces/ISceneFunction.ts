import { GameObject, GameScene } from "../classes";

export interface ISceneFunction<P = {}> {
  (props: P): {
    scene: GameScene;
    extras?: Record<string, GameObject>;
  };
}
