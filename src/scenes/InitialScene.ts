import { Scene, UIComponent } from "../../src/lib/render";
import { Resource } from "../../src/lib/render/classes/Resource";

const SCENE_NAME = "InitialScene";

export class InitialScene extends Scene {
  private butonNewGame: UIComponent = new UIComponent("span");
  private butonLoadGame: UIComponent = new UIComponent("span");
  constructor() {
    super(SCENE_NAME);

    this.AddResource(new Resource("title_background", "images"));

    const boxOut = new UIComponent("div");
    const box = new UIComponent("div");
    const a = new UIComponent("a");

    box.className = "button";
    a.getElement.innerText = "aquiii";

    boxOut.setStyle({
      position: "absolute",
      top: 0,
      left: 0,
      className: "boxOut",
    });

    boxOut.addToParent();
    box.addToParent(boxOut);
    a.addToParent(box);
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

