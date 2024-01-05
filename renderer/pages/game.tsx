import { useEffect, useRef } from "react";
import { Camera } from "../Game/Camera";
import { GameLoop } from "../Game/GameLoop";
import { GameObject } from "../Game/GameObject";
import { Resources } from "../Game/Resources";
import { Sprite } from "../Game/Sprite";
import { Vector2 } from "../Game/Vector2";

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const resources = new Resources();
    const mainScene = new GameObject(new Vector2(0, 0));
    const camera = new Camera();

    mainScene.camera = camera;

    const skySprite = new Sprite({
      resource: resources.images.sky,
      frameSize: new Vector2(320, 180),
    });

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
      <canvas ref={canvasRef} width="320" height="180"></canvas>
    </div>
  );
}
