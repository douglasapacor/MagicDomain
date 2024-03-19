import { Animation } from "./classes/Animation";
import { Builder } from "./classes/Builder";
import { Camera } from "./classes/Camera";
import { Events } from "./classes/Events";
import { FrameIndexPattern } from "./classes/FrameIndexPattern";
import { Game } from "./classes/Game";
import { GameLog } from "./classes/GameLog";
import { GameObject } from "./classes/GameObject";
import { Html } from "./classes/Html";
import { IEventCallback } from "./classes/Interfaces/IEventCallback";
import { IEventRegistration } from "./classes/Interfaces/IEventRegistration";
import { Loop } from "./classes/Loop";
import { Map } from "./classes/Map";
import { MapProvider } from "./classes/MapProvider";
import { Resources } from "./classes/Resources";
import { Scene } from "./classes/Scene";
import { SceneFactory } from "./classes/SceneFactory";
import { Sprite } from "./classes/Sprite";
import { Vector2 } from "./classes/Vector2";
import { animationConfig } from "./classes/types/animationConfig";
import { frameConfigTime } from "./classes/types/frameConfigTime";
import { htmlBuilderParams } from "./classes/types/htmlBuilderParams";
import { momentRegister } from "./classes/types/momentRegister";
import { resourceTypes } from "./classes/types/resourceTypes";
import { spriteConstructor } from "./classes/types/spriteConstructor";
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

const gameEvents = new Events();
const animationEvents = new Events();
const mapProvider = new MapProvider();

export {
  Animation,
  Builder,
  Camera,
  Events,
  FrameIndexPattern,
  Game,
  GameLog,
  GameObject,
  Html,
  IEventCallback,
  IEventRegistration,
  Loop,
  Map,
  Resources,
  Scene,
  SceneFactory,
  Sprite,
  Vector2,
  animationConfig,
  animationEvents,
  frameConfigTime,
  gameEvents,
  generateKey,
  generateLowerRandomString,
  generateRandomNumber,
  generateRandomRangeNumber,
  generateRandomString,
  generateRecoveryPasswordKey,
  generateUpperRandomString,
  gridCells,
  htmlBuilderParams,
  isSpaceFree,
  mapProvider,
  momentRegister,
  resourceTypes,
  spriteConstructor,
};
