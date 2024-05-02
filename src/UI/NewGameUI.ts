import { GUI, IUIConstructor, UIComponent } from "../../src/lib/render";

const UI_NAME = "NewGameUI";

export class NewGameUI extends GUI {
  private newGameFrame: UIComponent = new UIComponent({
    id: "NewGameFrame",
    tag: "div",
  });
  private gameNameInput: UIComponent = new UIComponent({
    id: "GameNameInput",
    tag: "input",
  });
  private gameNameLabel: UIComponent = new UIComponent({
    id: "GameNameLabel",
    tag: "label",
  });
  private worldFrame: UIComponent = new UIComponent({
    id: "WorldFrame",
    tag: "div",
  });
  private worldDetails: UIComponent = new UIComponent({
    id: "WorldDetails",
    tag: "div",
  });
  private worldDisplacement = 0;
  private worldDisplacementSize = 334;
  private maxDisplacement = -334 * 3;

  constructor(private uiAssets?: IUIConstructor) {
    super(UI_NAME);

    this.worldDisplacement = +window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--worldDisplacement")
      .replace("px", "");

    this.gameNameInput.setAttributes = { type: "text" };
    this.gameNameInput.setAttributes = { name: "gameName" };

    this.gameNameLabel.setAttributes = { for: "gameName" };
    this.gameNameLabel.innerText = "Nome do Jogo";

    this.newGameFrame.addChildren(this.gameNameLabel.element);
    this.newGameFrame.addChildren(this.gameNameInput.element);
    this.worldFrame.addChildren(
      this.uiAssets.sceneResources["xibalba_new_game"].image,
    );
    this.worldFrame.addChildren(
      this.uiAssets.sceneResources["aethel_new_game"].image,
    );
    this.worldFrame.addChildren(
      this.uiAssets.sceneResources["mu_new_game"].image,
    );

    this.worldDetails.element.innerText = "Nome do Plano";

    this.newGameFrame.addChildren(this.worldDetails.element);
    this.newGameFrame.addChildren(this.worldFrame.element);
    this.addChildren(this.newGameFrame.element);

    document.addEventListener("keydown", event => {
      if (event.key === "ArrowRight") {
        this.moveToRight();
      } else if (event.key === "ArrowLeft") {
        this.moveToLeft();
      }
    });
  }

  private moveToRight(): void {
    const displacement = this.worldDisplacement + this.worldDisplacementSize;

    if (displacement <= 0) {
      this.worldDisplacement =
        this.worldDisplacement + this.worldDisplacementSize;

      document.documentElement.style.setProperty(
        "--worldDisplacement",
        this.worldDisplacement + "px",
      );
    }
  }

  private moveToLeft(): void {
    const displacement = this.worldDisplacement - this.worldDisplacementSize;
    if (displacement > this.maxDisplacement) {
      this.worldDisplacement = displacement;
      document.documentElement.style.setProperty(
        "--worldDisplacement",
        this.worldDisplacement + "px",
      );
    }
  }
}
