import { Scene, UIComponent } from "../../src/lib/render";
import { Resource } from "../../src/lib/render/classes/Resource";

const SCENE_NAME = "InitialScene";

export class InitialScene extends Scene {
  private butonNewGame: UIComponent = new UIComponent("span");
  private butonLoadGame: UIComponent = new UIComponent("span");
  constructor() {
    super(SCENE_NAME);

    this.AddResource(new Resource("title_background", "images"));

    const box = new UIComponent("div");

    box.getElement.className = "title-scene-box";
    this.butonNewGame.getElement.className = "start-btn";
    this.butonLoadGame.getElement.className = "start-btn";
    this.butonNewGame.getElement.innerText = "Novo Jogo";
    this.butonLoadGame.getElement.innerText = "Carregar";

    this.butonNewGame.addToParent(box);
    this.butonLoadGame.addToParent(box);

    box.addToParent();
  }

  public override drawImage(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
  ): void {
    ctx.translate(0, 0);
    ctx.font = "30pt PixGamer";
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    ctx.drawImage(this.sceneResource["title_background"].image, x, y);
  }
}

