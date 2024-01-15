import { Vector2 } from "../classes";
import { Animation } from "../classes/Animation";
import { resourceImagesType } from "./resourceImagesType";

export type spriteConstructorType = {
  position?: Vector2 | null;
  resource: resourceImagesType;
  frameSize: Vector2 | null;
  hFrames?: number | null;
  vFrames?: number | null;
  frame?: number | null;
  scale?: number | null;
  animations?: Animation | null;
  name?: string;
};
