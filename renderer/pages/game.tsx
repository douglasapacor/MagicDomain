import { useEffect, useRef } from "react";
import {
  Camera,
  GameLoop,
  Input,
  Resources,
  Sprite,
  Vector2,
} from "../Game/classes";
import { GameObject } from "../Game/classes/GameObject";
import { gridCells } from "../Game/helpers/grid";
import { Player } from "../Game/objects/player/Player";

const gameParams = {
  resolution: {
    w: 1280,
    h: 720,
  },
};

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resources = new Resources();

    const mainScene = new GameObject(new Vector2(0, 0));

    const camera = new Camera(canvas.width, canvas.height);

    mainScene.addChild(camera);

    const skySprite = new Sprite({
      resource: resources.images.sky,
      frameSize: new Vector2(320, 180),
    });

    const areaSprite = new Sprite({
      resource: resources.images.areaOne,
      frameSize: new Vector2(480, 320),
    });

    mainScene.addChild(areaSprite);

    const player = new Player(
      gridCells(7),
      gridCells(6),
      resources.images.player
    );
    mainScene.addChild(player);

    mainScene.input = new Input();

    const Update = (_delta: number) => {
      mainScene.stepEntry(_delta, mainScene);
    };

    const Draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      skySprite.draw(context, 0, 0);

      context.save();

      context.translate(camera.position.x, camera.position.y);

      mainScene.draw(context, 0, 0);

      context.restore();
    };

    const gameLoop = new GameLoop(Update, Draw);

    gameLoop.start();

    return () => {};
  }, []);

  return (
    <div id="GameMainContainer">
      <canvas
        ref={canvasRef}
        width={gameParams.resolution.w}
        height={gameParams.resolution.h}
      ></canvas>
    </div>
  );
}
