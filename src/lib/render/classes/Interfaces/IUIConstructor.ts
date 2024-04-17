import { DataHolder } from "../DataHolder";
import { Resource } from "../Resource";
import { Sound } from "../Sound";

export interface IUIConstructor {
  sceneResources?: Record<string, Resource>;
  sceneData?: Record<string, DataHolder>;
  sceneSounds?: Record<string, Sound>;
}

