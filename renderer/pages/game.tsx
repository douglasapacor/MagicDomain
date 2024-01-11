import { useEffect, useRef } from "react";
import { Game } from "../Game/classes";
import { staticGameParams } from "../Game/statics/gameParams";

export default function GameView() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const game = new Game(canvasRef.current);
    game.loadGAME();
    return () => {};
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", position: "absolute" }}>
      <canvas
        ref={canvasRef}
        width={staticGameParams.resolution.w}
        height={staticGameParams.resolution.h}
      ></canvas>
    </div>
  );
}
