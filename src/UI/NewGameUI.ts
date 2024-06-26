/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getCSSMeasure,
  GUI,
  IUIConstructor,
  setCSSMeasure,
  UIComponent,
} from "../../src/lib/render";
import { GAME_EVENTS } from "../../src/statics/eventlist";
import { IconButton } from "./components/IconButton";
import { LeftArrowIcon } from "./components/icons/LeftArrowIcon";
import { RigthArrowIcon } from "./components/icons/RigthArrowIcon";
import { MainButton } from "./components/MainButton";

const UI_NAME = "NewGameUI";

export class NewGameUI extends GUI {
  private gameNameInputLabel: UIComponent<"label"> = new UIComponent<"label">(
    "GameNameInputLabel",
    "label",
  );
  private gameNameInput: UIComponent<"input"> = new UIComponent<"input">(
    "GameNameInput",
    "input",
  );
  private worldSlot: UIComponent<"div"> = new UIComponent<"div">(
    "WorldSlot",
    "div",
  );
  private rightButtonSlot: UIComponent<"div"> = new UIComponent<"div">(
    "RightButtonSlot",
    "div",
  );
  private rightButton: IconButton = new IconButton(
    "rbtn",
    new RigthArrowIcon("rbtnIcon"),
  );
  private leftButtonSlot: UIComponent<"div"> = new UIComponent<"div">(
    "LeftButtonSlot",
    "div",
  );
  private leftButton: IconButton = new IconButton(
    "lbtn",
    new LeftArrowIcon("lbtnIcon"),
  );
  private confirmButtonSlot: UIComponent<"div"> = new UIComponent<"div">(
    "ConfirmButtonSlot",
    "div",
  );
  private confirmButton: MainButton = new MainButton(
    "ConfirmButton",
    "iniciar",
  );
  private worldTextFrame: UIComponent<"div"> = new UIComponent<"div">(
    "WorldTextFrame",
    "div",
  );
  private worldTextName: UIComponent<"h4"> = new UIComponent<"h4">(
    "WorldTextName",
    "h4",
  );
  private advantagesTitle: UIComponent<"h5"> = new UIComponent<"h5">(
    "AdvantagesTitle",
    "h5",
  );
  private disadvantgesTitle: UIComponent<"h5"> = new UIComponent<"h5">(
    "DisadvantgesTitle",
    "h5",
  );
  private advantagesItens: UIComponent<"ul"> = new UIComponent<"ul">(
    "AdvantagesItens",
    "ul",
  );
  private disdvantagesItens: UIComponent<"ul"> = new UIComponent<"ul">(
    "AdvantagesItens",
    "ul",
  );
  private worldText: UIComponent<"p"> = new UIComponent<"p">(
    "WorldTextName",
    "p",
  );
  private worldPosition = 1;
  private worldSize = (this.worldSlot.element.clientWidth / 3) * 2;
  private worldMargin = this.worldSlot.element.clientWidth / 3 / 2;
  private worldDisplacement = getCSSMeasure("worldDisplacement");
  private maxDisplacement: number;
  private datails: any = {};

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

    this.worldTextFrame.addChildren(this.disadvantgesTitle.element);
    this.worldTextFrame.addChildren(this.disdvantagesItens.element);

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

    this.datails = this.uiAssets.sceneData["WorldDetailsData"].getDetails(
      this.worldPosition,
    );

    this.worldTextName.element.innerText = this.datails.name;
    this.worldText.element.innerText = this.datails.description.pt_br;

    this.advantagesTitle.innerText = "VANTAGENS";
    this.disadvantgesTitle.innerText = "DESVANTAGENS";

    for (let index = 0; index < this.datails.advantages.length; index++) {
      const it = document.createElement("li");
      it.innerText = this.datails.advantages[index];
      this.advantagesItens.element.append(it);
    }

    for (let index = 0; index < this.datails.disadvantges.length; index++) {
      const it = document.createElement("li");
      it.innerText = this.datails.disadvantges[index];
      this.disdvantagesItens.element.append(it);
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

      this.datails = this.uiAssets.sceneData["WorldDetailsData"].getDetails(
        this.worldPosition,
      );

      this.worldTextName.element.innerText = this.datails.name;
      this.worldText.element.innerText = this.datails.description.pt_br;

      this.advantagesItens.element.innerHTML = "";
      this.disdvantagesItens.element.innerHTML = "";

      for (let index = 0; index < this.datails.advantages.length; index++) {
        const it = document.createElement("li");
        it.innerText = this.datails.advantages[index];
        this.advantagesItens.element.append(it);
      }

      for (let index = 0; index < this.datails.disadvantges.length; index++) {
        const it = document.createElement("li");
        it.innerText = this.datails.disadvantges[index];
        this.disdvantagesItens.element.append(it);
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

      this.datails = this.uiAssets.sceneData["WorldDetailsData"].getDetails(
        this.worldPosition,
      );

      this.worldTextName.element.innerText = this.datails.name;
      this.worldText.element.innerText = this.datails.description.pt_br;

      this.advantagesItens.element.innerHTML = "";
      this.disdvantagesItens.element.innerHTML = "";

      for (let index = 0; index < this.datails.advantages.length; index++) {
        const it = document.createElement("li");
        it.innerText = this.datails.advantages[index];
        this.advantagesItens.element.append(it);
      }

      for (let index = 0; index < this.datails.disadvantges.length; index++) {
        const it = document.createElement("li");
        it.innerText = this.datails.disadvantges[index];
        this.disdvantagesItens.element.append(it);
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
    if (this.gameNameInput.element.value === "") {
      this.uiAssets.sceneSounds["error-start"].play();
      return;
    } else {
      window.bridge.send(GAME_EVENTS.REQUEST_NEW_GAME, {
        gameSloteName: this.gameNameInput.element.value,
        worldPosition: this.worldPosition,
        worldDetails: this.datails,
      });
      this.uiAssets.sceneSounds["success-start"].play();
      return;
    }
  };
}
