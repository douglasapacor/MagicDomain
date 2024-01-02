import { GameLoop } from "./classes/GameLoop";
import "./index.css";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

const update = (deltaTime: number) => {
  console.log("delta time", deltaTime);
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.restore();
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();