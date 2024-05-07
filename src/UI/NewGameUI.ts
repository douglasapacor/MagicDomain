/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getCSSMeasure,
  GUI,
  IUIConstructor,
  setCSSMeasure,
  UIComponent,
} from "../../src/lib/render";
import { IconButtonLeft } from "./components/IconButtonLeft";
import { IconButtonRigth } from "./components/IconButtonRigth";

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
  private worldPoints: UIComponent = new UIComponent({
    id: "WorldPoints",
    tag: "div",
  });
  private worldText: UIComponent = new UIComponent({
    id: "WorldText",
    tag: "div",
  });
  private rigthButtonArea: UIComponent = new UIComponent({
    id: "RigthButtonArea",
    tag: "div",
  });
  private leftButtonArea: UIComponent = new UIComponent({
    id: "LeftButtonArea",
    tag: "div",
  });

  private size = this.content.clientWidth / 3;
  private margin = (+this.size / 100) * 40;
  private maxDisplacement = -this.size * 3;
  private worldPosition = 1;
  private worldDisplacement = getCSSMeasure("worldDisplacement");
  private details: any;

  constructor(private uiAssets?: IUIConstructor) {
    super(UI_NAME);

    setCSSMeasure("worldFrameSize", this.size.toFixed(2));
    setCSSMeasure("worldSize", (this.size - this.margin).toFixed(2));
    setCSSMeasure("worldMargin", (this.margin / 2).toFixed(2));

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
    this.details = this.uiAssets.sceneData["WorldDetailsData"].getDetails(
      this.worldPosition,
    );
    this.worldDetails.element.innerText = this.details.name;
    this.worldText.element.innerText = this.details.description.pt_br;

    this.newGameFrame.addChildren(this.worldDetails.element);
    this.newGameFrame.addChildren(this.worldFrame.element);
    this.newGameFrame.addChildren(this.worldPoints.element);

    this.rigthButtonArea.element.appendChild(
      new IconButtonRigth("sdasdadasas").element,
    );
    this.leftButtonArea.element.appendChild(
      new IconButtonLeft("pasdjaldjhlajkdkdnaksjhasjk").element,
    );

    this.addChildren(this.newGameFrame.element);
    this.addChildren(this.rigthButtonArea.element);
    this.addChildren(this.leftButtonArea.element);
    this.addChildren(this.worldText.element);

    const gfHeight = +getComputedStyle(
      this.newGameFrame.element,
    ).height.replace("px", "");
    const gfWidth = +getComputedStyle(this.newGameFrame.element).width.replace(
      "px",
      "",
    );
    const uiWidth = +getComputedStyle(this.content).width.replace("px", "");
    const uiHeight = +getComputedStyle(this.content).height.replace("px", "");

    setCSSMeasure("textTopHeight", gfHeight.toString());

    document.addEventListener("keydown", event => {
      if (event.key === "ArrowRight") {
        this.moveToRight();
      } else if (event.key === "ArrowLeft") {
        this.moveToLeft();
      }
    });
  }

  private moveToRight = (): void => {
    const displacement = this.worldDisplacement + this.size;
    if (displacement <= 0) {
      this.worldDisplacement = this.worldDisplacement + this.size;
      this.worldPosition -= 1;
      this.details = this.uiAssets.sceneData["WorldDetailsData"].getDetails(
        this.worldPosition,
      );
      this.worldDetails.element.innerText = this.details.name;
      this.worldText.element.innerText = this.details.description.pt_br;
      document.documentElement.style.setProperty(
        "--worldDisplacement",
        this.worldDisplacement + "px",
      );
    }
  };

  private moveToLeft = (): void => {
    const displacement = this.worldDisplacement - this.size;
    if (displacement > this.maxDisplacement) {
      this.worldDisplacement = displacement;
      this.worldPosition += 1;
      this.details = this.uiAssets.sceneData["WorldDetailsData"].getDetails(
        this.worldPosition,
      );
      this.worldDetails.element.innerText = this.details.name;
      this.worldText.element.innerText = this.details.description.pt_br;
      document.documentElement.style.setProperty(
        "--worldDisplacement",
        this.worldDisplacement + "px",
      );
    }
  };
}
