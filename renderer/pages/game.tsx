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
    <div style={{ width: "100%", height: "100%", position: "absolute" }}>
      <div
        style={{
          position: "absolute",
          width: 220,
          background: "#607D8B",
          top: 10,
          left: 10,
          display: "inline-block",
          boxSizing: "border-box",
          padding: 5,
        }}
      >
        <div
          style={{
            border: "1px solid #000",
            width: "100%",
            height: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 3,
          }}
        >
          <div style={{ width: "33%" }}>icn</div>
          <div style={{ width: "66%" }}>
            <div style={{ width: "100%" }}>nome do player</div>
            <div style={{ width: "100%" }}>Lvl: 10 | Warrior</div>
          </div>
        </div>

        <div
          style={{
            border: "1px solid #000",
            width: "100%",
            marginBottom: 3,
            background: "#D32F2F",
          }}
        >
          Life
        </div>

        <div
          style={{
            border: "1px solid #000",
            width: "100%",
            background: "#1A237E",
          }}
        >
          mana
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={gameParams.resolution.w}
        height={gameParams.resolution.h}
      ></canvas>
    </div>
  );
}
