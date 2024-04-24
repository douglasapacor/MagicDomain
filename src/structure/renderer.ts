import { Game } from "../lib/render";
import * as scenes from "../scenes";
import { GAME_EVENTS } from "../statics/eventlist";
import "../styles/initialSceneStyle.css";
import "../styles/main.css";
import "../styles/newGameSceneStyle.css";
import "../styles/root.css";

const game = new Game(scenes);

window.bridge.on(GAME_EVENTS.START_RESPONSE, () => game.start());
