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
import { CharacterFrame } from "../Game/objects/characterFrame/CharacterFrame";
import { MiniMap } from "../Game/objects/miniMap/MiniMap";
import { PartyFrame } from "../Game/objects/partyFrame/PartyFrame";
import { Player } from "../Game/objects/player/Player";

const gameParams = {
  resolution: {
    w: 1280,
    h: 720,
  },
};

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCharFrame = useRef<HTMLCanvasElement | null>(null);

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
    const characterFrame = new CharacterFrame();

    const minimap = new MiniMap();
    const partyFrame = new PartyFrame();

    const Update = (_delta: number) => {
      mainScene.stepEntry(_delta, mainScene);
    };

    const Draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      context.translate(camera.position.x, camera.position.y);
      mainScene.draw(context, 0, 0);
      context.restore();

      characterFrame.draw(context, 15, 15);
      minimap.draw(context, canvas.width - 110, 110);
      partyFrame.draw(context, 15, 150);
    };

    const gameLoop = new GameLoop(Update, Draw);
    gameLoop.start();

    return () => {};
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", position: "absolute" }}>
      <div
        style={{
          backgroundColor: "white",
          position: "absolute",
          height: 40,
          width: 250,
          top: 30,
          right: 250,
        }}
      >
        buffs/debuffs
      </div>

      <div
        style={{
          backgroundColor: "white",
          position: "absolute",
          height: "40%",
          width: 250,
          top: 220,
          right: 30,
        }}
      >
        Quest Log
      </div>

      <canvas
        ref={canvasRef}
        width={gameParams.resolution.w}
        height={gameParams.resolution.h}
        style={{ background: "blue" }}
      ></canvas>

      <div
        style={{
          backgroundColor: "white",
          position: "absolute",
          height: 100,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        interface comando
      </div>
    </div>
  );
}
