import { staticResources } from "../statics/resources";
import { Events } from "./Events";
import { MasterEvents } from "./MasterEvents";
import { Resources } from "./Resources";

export const events = new Events();
export const masterEvents = new MasterEvents();
export const resources = new Resources(staticResources);

export { Animations } from "./Animations";
export { Camera } from "./Camera";
export { Events } from "./Events";
export { FrameIndexPattern } from "./FrameIndexPattern";
export { Game } from "./Game";
export { GameLoop } from "./GameLoop";
export { GameObject } from "./GameObject";
export { GameScene } from "./GameScene";
export { Input } from "./Input";
export { Resources } from "./Resources";
export { Sprite } from "./Sprite";
export { Vector2 } from "./Vector2";
