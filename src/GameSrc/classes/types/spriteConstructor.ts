import { Animation } from "../Animation";
import { Vector2 } from "../Vector2";
import { resourceTypes } from "./resourceTypes";

export type spriteConstructor = {
  resource: resourceTypes;
  name?: string;
  frameSize?: Vector2;
  hFrames?: number;
  vFrames?: number;
  frame?: number;
  scale?: number;
  position?: Vector2;
  animations?: Animation;
};

