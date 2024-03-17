import { gridCells, isSpaceFree } from "./helpers/grid";
import {
  generateKey,
  generateLowerRandomString,
  generateRandomNumber,
  generateRandomRangeNumber,
  generateRandomString,
  generateRecoveryPasswordKey,
  generateUpperRandomString,
} from "./helpers/randoms";
import { Animation } from "./lib/Animation";
import { Camera } from "./lib/Camera";
import { Events } from "./lib/Events";
import { FrameIndexPattern } from "./lib/FrameIndexPattern";
import { Game } from "./lib/Game";
import { GameObject } from "./lib/GameObject";
import { Html } from "./lib/Html";
import { HtmlBuilder } from "./lib/HtmlBuilder";
import { Loop } from "./lib/Loop";
import { Resources } from "./lib/Resources";
import { Scene } from "./lib/Scene";
import { Sprite } from "./lib/Sprite";
import { UI } from "./lib/UI";
import { Vector2 } from "./lib/Vector2";
import { PresentationScene } from "./scenes/PresentationScene";
import { StudioScene } from "./scenes/StudioScene";
import { commomNumbers, lowerAlphabet, upperAlphabet } from "./static/base";
import localFiles from "./static/localFiles";

const gameEvents = new Events();
const resources = new Resources(localFiles);

export {
  Animation,
  Camera,
  Events,
  FrameIndexPattern,
  Game,
  GameObject,
  Html,
  HtmlBuilder,
  Loop,
  PresentationScene,
  Resources,
  Scene,
  Sprite,
  StudioScene,
  UI,
  Vector2,
  commomNumbers,
  gameEvents,
  generateKey,
  generateLowerRandomString,
  generateRandomNumber,
  generateRandomRangeNumber,
  generateRandomString,
  generateRecoveryPasswordKey,
  generateUpperRandomString,
  gridCells,
  isSpaceFree,
  lowerAlphabet,
  resources,
  upperAlphabet,
};
