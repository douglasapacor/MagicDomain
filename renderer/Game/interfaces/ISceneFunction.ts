import { GameObject, GameScene } from "../classes";

type sceneFunctionReturnType = {
  [propKey: string]: GameScene | GameObject;
};
export interface ISceneFunction<P = {}> {
  (props: P): sceneFunctionReturnType;
}
