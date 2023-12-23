import React from "react";

const GameScreen: React.FC<{
  canvaRef: React.MutableRefObject<HTMLCanvasElement>;
}> = ({ ...props }) => {
  return (
    <canvas ref={props.canvaRef} id="GameScreenBox">
      Seu navegador não suporta o elemento canvas.
    </canvas>
  );
};

export default GameScreen;
