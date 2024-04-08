import {
  gameEvents,
  Scene,
  SceneFactory,
  SceneProvider,
  TextHolder,
  textHolderFactory,
} from "..";
import { GAME_EVENTS } from "../../../statics/eventlist";
import { GameLog } from "./GameLog";
import { Html } from "./Html";
import { Loop } from "./Loop";

type viewController = {
  state: "in" | "out";
  opacity: number;
  canLoad: boolean;
  needChangeState: boolean;
  frames: number;
};

export class Game {
  private loop: Loop;
  public html: Html;
  private gameLog: GameLog;
  private view: viewController;

  constructor(
    private scenes: { [key: string]: typeof Scene },
    private textHolders: { [key: string]: typeof TextHolder },
  ) {
    this.html = new Html();
    this.loop = new Loop(this.Update, this.Draw);
    this.gameLog = new GameLog();
    this.view = {
      state: "in",
      opacity: 1,
      canLoad: true,
      needChangeState: false,
      frames: 0,
    };

    gameEvents.on("fade", this, this.fade);

    window.bridge.send(GAME_EVENTS.REQUEST_START);
  }

  private calculateElapsedTime(): void {
    const currentTime = new Date();
    const timeDifference =
      currentTime.getTime() - this.gameLog.startedAt.getTime();
    const totalMilliseconds = timeDifference;
    const millisecondsInSecond = 1000;
    const millisecondsInMinute = 60 * millisecondsInSecond;
    const millisecondsInHour = 60 * millisecondsInMinute;
    const millisecondsInDay = 24 * millisecondsInHour;
    const days = Math.floor(totalMilliseconds / millisecondsInDay);
    const remainingMillisecondsAfterDays =
      totalMilliseconds % millisecondsInDay;
    const hour = Math.floor(
      remainingMillisecondsAfterDays / millisecondsInHour,
    );
    const remainingMillisecondsAfterHours =
      remainingMillisecondsAfterDays % millisecondsInHour;
    const minute = Math.floor(
      remainingMillisecondsAfterHours / millisecondsInMinute,
    );
    const remainingMillisecondsAfterMinutes =
      remainingMillisecondsAfterHours % millisecondsInMinute;
    const seconds = Math.floor(
      remainingMillisecondsAfterMinutes / millisecondsInSecond,
    );
    const remainingMillisecondsAfterSeconds =
      remainingMillisecondsAfterMinutes % millisecondsInSecond;
    const miliseconds = remainingMillisecondsAfterSeconds;

    this.gameLog.elapsedTime = {
      days,
      hour,
      minute,
      seconds,
      miliseconds,
    };
  }

  private Draw = (): void => {
    this.html.context.clearRect(
      0,
      0,
      this.html.canvasElement.width,
      this.html.canvasElement.height,
    );

    this.html.context.save();

    if (SceneProvider.current) {
      if (SceneProvider.current.isLoaded) {
        SceneProvider.current.draw(this.html.context, 0, 0);
      }
    }

    this.html.context.restore();
  };

  private Update = (delta: number): void => {
    this.view.frames += 1;

    if (this.view.needChangeState) {
      const opacityTarget = this.view.state === "in" ? 0 : 1;

      const fadeAmount =
        (opacityTarget - this.view.opacity) / (20 * this.loop.timeStep);

      this.view.opacity += fadeAmount * delta;

      const EPSILON = 0.01;

      if (this.view.state === "in" && this.view.opacity <= EPSILON) {
        this.html.overlay.style.opacity = "0";

        this.view.opacity = 0;
        this.view.state = "out";
        this.view.needChangeState = false;
        this.view.canLoad = false;
      }

      if (this.view.state === "out" && this.view.opacity >= 1) {
        this.html.overlay.style.opacity = "1";

        this.view.opacity = 1;
        this.view.state = "in";
        this.view.needChangeState = false;
        this.view.canLoad = true;
      }

      this.html.overlay.style.opacity = this.view.opacity.toFixed(3);
    }

    if (SceneProvider.current) SceneProvider.current.stepEntry(delta);

    this.calculateElapsedTime();
  };

  public start = (): void => {
    Object.keys(this.scenes).forEach(sceneName =>
      SceneFactory.register(sceneName, this.scenes[sceneName]),
    );

    Object.keys(this.textHolders).forEach(textHolderName =>
      textHolderFactory.register(
        textHolderName,
        this.textHolders[textHolderName],
      ),
    );

    SceneProvider.loadScene("StartScene");

    this.fade();
    this.loop.Start();

    setTimeout(() => {
      this.fade();
    }, 6000);
  };

  public fade = async (): Promise<void> => {
    this.view.needChangeState = true;
  };
}
