import { useEffect, useRef } from "react";
import { GameContainer } from "../Game/classes";
import { staticGameParams } from "../Game/statics/gameParams";

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const gameContainer = new GameContainer(canvasRef.current);
    gameContainer.loadGAME();
    return () => {};
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", position: "absolute" }}>
      <canvas
        ref={canvasRef}
        width={staticGameParams.resolution.w}
        height={staticGameParams.resolution.h}
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
        className="pix-gamer"
      >
        interface comando
      </div>
    </div>
  );
}
