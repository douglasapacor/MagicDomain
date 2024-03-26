import { Game } from "../lib";
import "../styles/main.css";
const game = new Game();

window.bridge.on("startgame", () => {
  console.log("aqui");

  game.Start();
  console.log("e aqui");
});
