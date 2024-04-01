import { Game } from "../lib/render";
import * as scenes from "../scenes";
import * as scriptableObjects from "../scriptableObjects";
import { GAME_EVENTS } from "../statics/eventlist";
import "../styles/main.css";
const game = new Game(scenes, scriptableObjects);

window.bridge.on(GAME_EVENTS.START_RESPONSE, () => game.Start());
