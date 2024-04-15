import { Animation } from "./classes/Animation";
import { Builder } from "./classes/Builder";
import { Camera } from "./classes/Camera";
import { DataHolder } from "./classes/DataHolder";
import { Dimensions } from "./classes/Dimensions";
import { Entity } from "./classes/Entity";
import { Events } from "./classes/Events";
import { FrameIndexPattern } from "./classes/FrameIndexPattern";
import { GUI } from "./classes/GUI";
import { Game } from "./classes/Game";
import { GameLog } from "./classes/GameLog";
import { GameObject } from "./classes/GameObject";
import { Html } from "./classes/Html";
import { Input } from "./classes/Input";
import { IAddEventListener } from "./classes/Interfaces/IAddEventListener";
import { ICreateElement } from "./classes/Interfaces/ICreateElement";
import { IEventCallback } from "./classes/Interfaces/IEventCallback";
import { IEventRegistration } from "./classes/Interfaces/IEventRegistration";
import { IHtmlBuilderAttributes } from "./classes/Interfaces/IHtmlBuilderAttributes";
import { INotifyEvent } from "./classes/Interfaces/INotifyEvent";
import { IRemoveEventListener } from "./classes/Interfaces/IRemoveEventListener";
import { ISetAttribute } from "./classes/Interfaces/ISetAttribute";
import { IUIComponentConstructor } from "./classes/Interfaces/IUIComponentConstructor";
import { Loop } from "./classes/Loop";
import { Map } from "./classes/Map";
import { Resource } from "./classes/Resource";
import { Scene } from "./classes/Scene";
import { SceneFactory } from "./classes/SceneFactory";
import { SceneProvider } from "./classes/SceneProvider";
import { Sprite } from "./classes/Sprite";
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
  GUI,
  Html,
  IAddEventListener,
  ICreateElement,
  IEventCallback,
  IEventRegistration,
  IHtmlBuilderAttributes,
  INotifyEvent,
  Input,
  IRemoveEventListener,
  ISetAttribute,
  isSpaceFree,
  IUIComponentConstructor,
  keyboardEvents,
  Loop,
  Map,
  momentRegister,
  moveTowards,
  Resource,
  resourceTypes,
  Scene,
  SceneFactory,
  SceneProvider,
  Sprite,
  spriteConstructor,
  UIComponent,
  Vector2,
};
