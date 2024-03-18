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

import { Events } from "./lib/Events";
import { Game } from "./lib/Game";
import { GameLog } from "./lib/GameLog";
import { GameObject } from "./lib/GameObject";
import { Html } from "./lib/Html";
import { Loop } from "./lib/Loop";
import { Scene } from "./lib/Scene";
import { SceneFactory } from "./lib/SceneFactory";
import { Vector2 } from "./lib/Vector2";

(() => {
  // SceneFactory.registerSceneClass("", )
})();

export {
  Events,
  Game,
  GameLog,
  GameObject,
  Html,
  Loop,
  Scene,
  SceneFactory,
  Vector2,
  generateKey,
  generateLowerRandomString,
  generateRandomNumber,
  generateRandomRangeNumber,
  generateRandomString,
  generateRecoveryPasswordKey,
  generateUpperRandomString,
  gridCells,
  isSpaceFree,
};
