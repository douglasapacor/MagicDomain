import { Animation } from "./classes/Animation";
import { Builder } from "./classes/Builder";
import { Camera } from "./classes/Camera";
import { DataHolder } from "./classes/DataHolder";
import { Dimensions } from "./classes/Dimensions";
import { Entity } from "./classes/Entity";
import { Events } from "./classes/Events";
import { FrameIndexPattern } from "./classes/FrameIndexPattern";
import { Game } from "./classes/Game";
import { GameLog } from "./classes/GameLog";
import { GameObject } from "./classes/GameObject";
import { Html } from "./classes/Html";
import { Input } from "./classes/Input";
import { IEventCallback } from "./classes/Interfaces/IEventCallback";
import { IEventRegistration } from "./classes/Interfaces/IEventRegistration";
import { IGameObject } from "./classes/Interfaces/IGameObject";
import { IHtmlBuilderAttributes } from "./classes/Interfaces/IHtmlBuilderAttributes";
import { Loop } from "./classes/Loop";
import { Map } from "./classes/Map";
import { MapFactory } from "./classes/MapFactory";
import { Resources } from "./classes/Resources";
import { Scene } from "./classes/Scene";
import { SceneFactory } from "./classes/SceneFactory";
import { SceneProvider } from "./classes/SceneProvider";
import { Sprite } from "./classes/Sprite";
import { TextHolder } from "./classes/TextHolder";
import { TextHolderFactory } from "./classes/TextHolderFactory";
import { TextHolderProvider } from "./classes/TextHolderProvider";
import { UIComponent } from "./classes/UIComponent";
import { Vector2 } from "./classes/Vector2";
import { animationConfig } from "./classes/types/animationConfig";
import { frameConfigTime } from "./classes/types/frameConfigTime";
import { momentRegister } from "./classes/types/momentRegister";
import { resourceTypes } from "./classes/types/resourceTypes";
import { spriteConstructor } from "./classes/types/spriteConstructor";
import { gridCells, isSpaceFree } from "./helpers/grid";
import { moveTowards } from "./helpers/moveTowards";
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
const keyboardEvents = new Events();

const resources = new Resources();

const sceneFactory = new SceneFactory();
const textHolderFactory = new TextHolderFactory();

const sceneProvider = new SceneProvider();
const textHolderProvider = new TextHolderProvider();

export {
  Animation,
  animationConfig,
  animationEvents,
  Builder,
  Camera,
  DataHolder,
  Dimensions,
  Entity,
  Events,
  frameConfigTime,
  FrameIndexPattern,
  Game,
  gameEvents,
  GameLog,
  GameObject,
  generateKey,
  generateLowerRandomString,
  generateRandomNumber,
  generateRandomRangeNumber,
  generateRandomString,
  generateRecoveryPasswordKey,
  generateUpperRandomString,
  gridCells,
  Html,
  IEventCallback,
  IEventRegistration,
  IGameObject,
  IHtmlBuilderAttributes,
  Input,
  isSpaceFree,
  keyboardEvents,
  Loop,
  Map,
  MapFactory,
  momentRegister,
  moveTowards,
  Resources,
  resources,
  resourceTypes,
  Scene,
  sceneFactory,
  sceneProvider,
  Sprite,
  spriteConstructor,
  TextHolder,
  textHolderFactory,
  textHolderProvider,
  UIComponent,
  Vector2,
};
