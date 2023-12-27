import { useEffect, useRef } from "react";
export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canva = canvasRef.current;
    if (!canva) {
      return;
    }

    const context = canva.getContext("2d");
    if (!context) {
      return;
    }
  }, []);

  return (
    <div id="GameFrame">
      <canvas ref={canvasRef} width="320" height="180"></canvas>
    </div>
  );
}
