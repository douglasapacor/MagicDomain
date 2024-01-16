import { GameScene, UI, resources } from "../classes";

const buildCompanyLogoScene = (w: number, h: number) => {
  const companyLogoScene = new GameScene("companyLogoScene");
  // companyLogoScene.isInitialScene = true;

  const background = new UI("background_company_logo");

  background.drawImage = (
    ctx: CanvasRenderingContext2D,
    drawPosX: number,
    drawPosY: number
  ) => {
    const newPosX = drawPosX + w / 2 - resources.images.EqLogo.image.width / 2;
    const newPosY = drawPosY + h / 2 - resources.images.EqLogo.image.height / 2;
    ctx.fillStyle = "black";
    ctx.drawImage(resources.images.EqLogo.image, newPosX, newPosY);
  };

  companyLogoScene.addUI(background);

  return companyLogoScene;
};

export default buildCompanyLogoScene;
