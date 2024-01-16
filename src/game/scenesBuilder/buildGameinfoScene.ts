import { GameScene, UI } from "../classes";

const buildGameInfoScene = (w: number, h: number): GameScene => {
  const gameInfoScene = new GameScene("gameInfoScene");
  gameInfoScene.isInitialScene = true;

  const background = new UI("background_game_info");

  background.drawImage = (
    ctx: CanvasRenderingContext2D,
    drawPosX: number,
    drawPosY: number
  ) => {
    ctx.fillStyle = "black";
    ctx.fillRect(drawPosX, drawPosY, w, h);
    ctx.font = "38px PixGamer";
    ctx.fillStyle = "white";
    ctx.fillText("Magic Domain ® made by Epic Quest", 45, 70);
    ctx.fillText(`Game version: v0.0.1`, 45, 120);
    ctx.fillText(
      `Magic domain is a proprietary product of the Epic Quest studio.`,
      45,
      170
    );
    ctx.fillText(
      `For more information, visit http://magicdomain.com or contact us via email at epicquest@epicquetti.com.br`,
      45,
      220
    );
  };

  gameInfoScene.addUI(background);

  return gameInfoScene;
};

export default buildGameInfoScene;
