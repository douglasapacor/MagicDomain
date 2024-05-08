/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getCSSMeasure,
  GUI,
  IUIConstructor,
  setCSSMeasure,
  UIComponent,
} from "../../src/lib/render";
import { IconButton } from "./components/IconButton";
import { LeftArrowIcon } from "./components/icons/LeftArrowIcon";
import { RigthArrowIcon } from "./components/icons/RigthArrowIcon";
import { MainButton } from "./components/MainButton";

const UI_NAME = "NewGameUI";

export class NewGameUI extends GUI {
  private gameNameInputLabel: UIComponent = new UIComponent({
    id: "GameNameInputLabel",
    tag: "label",
  });

  private gameNameInput: UIComponent = new UIComponent({
    id: "GameNameInput",
    tag: "input",
  });

  private worldSlot: UIComponent = new UIComponent({
    id: "WorldSlot",
    tag: "div",
  });

  private rightButtonSlot: UIComponent = new UIComponent({
    id: "RightButtonSlot",
    tag: "div",
  });

  private rightButton: IconButton = new IconButton(
    "rbtn",
    new RigthArrowIcon("rbtnIcon"),
  );

  private leftButtonSlot: UIComponent = new UIComponent({
    id: "LeftButtonSlot",
    tag: "div",
  });

  private leftButton: IconButton = new IconButton(
    "lbtn",
    new LeftArrowIcon("lbtnIcon"),
  );

  private confirmButtonSlot: UIComponent = new UIComponent({
    id: "ConfirmButtonSlot",
    tag: "div",
  });

  private confirmButton: MainButton = new MainButton(
    "ConfirmButton",
    "iniciar",
  );

  private worldTextFrame: UIComponent = new UIComponent({
    id: "WorldTextFrame",
    tag: "div",
  });

  private worldTextName: UIComponent = new UIComponent({
    id: "WorldTextName",
    tag: "h4",
  });

  private advantagesTitle: UIComponent = new UIComponent({
    id: "AdvantagesTitle",
    tag: "h5",
  });

  private advantagesItens: UIComponent = new UIComponent({
    id: "AdvantagesItens",
    tag: "ul",
  });

  private worldText: UIComponent = new UIComponent({
    id: "WorldTextName",
    tag: "p",
  });

  private worldPosition = 1;
  private worldSize = (this.worldSlot.element.clientWidth / 3) * 2;
  private worldMargin = this.worldSlot.element.clientWidth / 3 / 2;
  private worldDisplacement = getCSSMeasure("worldDisplacement");
  private maxDisplacement: number;

  constructor(private uiAssets?: IUIConstructor) {
    super(UI_NAME);

    this.gameNameInputLabel.innerText = "Nome do slote";
    this.gameNameInput.setAttributes = { type: "text" };

    this.rightButtonSlot.addChildren(this.rightButton.element);
    this.leftButtonSlot.addChildren(this.leftButton.element);
    this.confirmButtonSlot.addChildren(this.confirmButton.element);

    this.worldTextFrame.addChildren(this.worldTextName.element);
    this.worldTextFrame.addChildren(this.worldText.element);
    this.worldTextFrame.addChildren(this.advantagesTitle.element);

    this.worldTextFrame.addChildren(this.advantagesItens.element);

    this.addChildren(this.gameNameInputLabel.element);
    this.addChildren(this.gameNameInput.element);
    this.addChildren(this.worldSlot.element);
    this.addChildren(this.rightButtonSlot.element);
    this.addChildren(this.leftButtonSlot.element);
    this.addChildren(this.worldTextFrame.element);
    this.addChildren(this.confirmButtonSlot.element);

    this.worldSlot.addChildren(
      this.uiAssets.sceneResources["xibalba_new_game"].image,
    );

    this.worldSlot.addChildren(
      this.uiAssets.sceneResources["aethel_new_game"].image,
    );

    this.worldSlot.addChildren(
      this.uiAssets.sceneResources["mu_new_game"].image,
    );

    const det = this.uiAssets.sceneData["WorldDetailsData"].getDetails(
      this.worldPosition,
    );

    this.worldTextName.element.innerText = det.name;
    this.worldText.element.innerText = det.description.pt_br;
    this.advantagesTitle.innerText = "vantagens";

    this.worldTextName.element.innerText = det.name;
    this.worldText.element.innerText = det.description.pt_br;

    for (let index = 0; index < det.advantages.length; index++) {
      const it = document.createElement("li");
      it.innerText = det.advantages[index];
      this.advantagesItens.element.append(it);
    }

    this.leftButton.element.onclick = this.moveToRight;
    this.rightButton.element.onclick = this.moveToLeft;
    this.confirmButton.element.onclick = this.createNewGame;

    this.gameNameInput.element.onkeydown = () => {
      if (this.uiAssets)
        if (this.uiAssets.sceneSounds)
          this.uiAssets.sceneSounds["button-pop"].play();
    };

    document.addEventListener("keydown", event => {
      if (event.key === "ArrowRight") {
        this.moveToRight();
      } else if (event.key === "ArrowLeft") {
        this.moveToLeft();
      }
    });
  }

  public override Step(): void {
    this.worldSize = (this.worldSlot.element.clientWidth / 3) * 2;
    this.worldMargin = this.worldSlot.element.clientWidth / 3 / 2;
    this.maxDisplacement = -(this.worldSize * 3);

    setCSSMeasure("worldSize", this.worldSize.toFixed(2));
    setCSSMeasure("worldMargin", this.worldMargin.toFixed(2));

    const multiplier = this.worldPosition - 1;

    const positiveDisplacement =
      multiplier * this.worldSlot.element.clientWidth;

    if (positiveDisplacement === 0) this.worldDisplacement = 0;
    else this.worldDisplacement = positiveDisplacement * -1;
  }

  private moveToRight = (): void => {
    if (this.worldDisplacement + this.worldSize <= 0) {
      this.worldDisplacement =
        this.worldDisplacement + this.worldSlot.element.clientWidth;

      this.worldPosition -= 1;

      const det = this.uiAssets.sceneData["WorldDetailsData"].getDetails(
        this.worldPosition,
      );

      this.worldTextName.element.innerText = det.name;

      this.worldText.element.innerText = det.description.pt_br;

      for (let index = 0; index < det.advantages.length; index++) {
        const it = document.createElement("li");
        it.innerText = det.advantages[index];
        this.advantagesItens.element.append(it);
      }

      document.documentElement.style.setProperty(
        "--worldDisplacement",
        this.worldDisplacement + "px",
      );
    }

    if (this.uiAssets)
      if (this.uiAssets.sceneSounds)
        this.uiAssets.sceneSounds["button-pop"].play();
  };

  private moveToLeft = (): void => {
    if (this.worldDisplacement - this.worldSize > this.maxDisplacement) {
      this.worldDisplacement =
        this.worldDisplacement - this.worldSlot.element.clientWidth;

      this.worldPosition += 1;

      const det = this.uiAssets.sceneData["WorldDetailsData"].getDetails(
        this.worldPosition,
      );

      this.worldTextName.element.innerText = det.name;

      this.worldText.element.innerText = det.description.pt_br;

      for (let index = 0; index < det.advantages.length; index++) {
        const it = document.createElement("li");
        it.innerText = det.advantages[index];
        this.advantagesItens.element.append(it);
      }

      document.documentElement.style.setProperty(
        "--worldDisplacement",
        this.worldDisplacement + "px",
      );
    }

    if (this.uiAssets)
      if (this.uiAssets.sceneSounds)
        this.uiAssets.sceneSounds["button-pop"].play();
  };

  private createNewGame = (): void => {
    if (this.uiAssets)
      if (this.uiAssets.sceneSounds)
        this.uiAssets.sceneSounds["success-start"].play();
  };
}
