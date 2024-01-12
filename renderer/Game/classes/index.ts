import { staticResources } from "../statics/resources";
import { Events } from "./core/Events";
import { MasterEvents } from "./core/MasterEvents";
import { Resources } from "./core/Resources";

export const events = new Events();
export const masterEvents = new MasterEvents();
export const resources = new Resources(staticResources);

export { Animations } from "./animations/Animations";
export { FrameIndexPattern } from "./animations/FrameIndexPattern";
export { Sprite } from "./animations/Sprite";
export { Camera } from "./core/Camera";
export { Events } from "./core/Events";
export { Game } from "./core/Game";
export { GameLoop } from "./core/GameLoop";
export { GameObject } from "./core/GameObject";
export { GameScene } from "./core/GameScene";
export { Input } from "./core/Input";
export { Resources } from "./core/Resources";
export { Vector2 } from "./core/Vector2";
