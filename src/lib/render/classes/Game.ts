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

export class Game {
  private loop: Loop;
  public html: Html;
  private gameLog: GameLog;
  private gameCore: {
    viewOpacity: number;
    fadeState: "in" | "out";
    fadeStateNeedsChanged: boolean;
    sceneCanBeLoaded: boolean;
    sceneNeedsToBeChanged: boolean;
    sceneToBeLoaded: string | null;
    sceneNeedsLoadClass: boolean;
    sceneNeedsToBeCleaned: boolean;
  };

  constructor(
    private scenes: { [key: string]: typeof Scene },
    private textHolders: { [key: string]: typeof TextHolder },
  ) {
    this.html = new Html();
    this.loop = new Loop(this.Update, this.Draw);
    this.gameLog = new GameLog();
    this.gameCore = {
      fadeState: "in",
      fadeStateNeedsChanged: false,
      sceneCanBeLoaded: true,
      sceneNeedsToBeChanged: false,
      sceneToBeLoaded: null,
      viewOpacity: 1,
      sceneNeedsLoadClass: false,
      sceneNeedsToBeCleaned: false,
    };

    gameEvents.on(GAME_EVENTS.CHANGE_SCENE, this, this.changeScene);

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
    if (this.gameCore.fadeStateNeedsChanged) {
      const opacityTarget = this.gameCore.fadeState === "in" ? 0 : 1;
      const fadeAmount =
        (opacityTarget - this.gameCore.viewOpacity) / (20 * this.loop.timeStep);

      this.gameCore.viewOpacity += fadeAmount * delta;

      if (
        this.gameCore.fadeState === "in" &&
        this.gameCore.viewOpacity <= 0.01
      ) {
        this.html.overlay.style.opacity = "0";
        this.gameCore.viewOpacity = 0;
        this.gameCore.fadeState = "out";
        this.gameCore.fadeStateNeedsChanged = false;
        this.gameCore.sceneCanBeLoaded = false;
      }

      if (
        this.gameCore.fadeState === "out" &&
        this.gameCore.viewOpacity >= 0.99
      ) {
        this.html.overlay.style.opacity = "1";
        this.gameCore.viewOpacity = 1;
        this.gameCore.fadeState = "in";
        this.gameCore.fadeStateNeedsChanged = false;
        this.gameCore.sceneCanBeLoaded = true;
      }

      this.html.overlay.style.opacity = (
        Math.round((this.gameCore.viewOpacity + Number.EPSILON) * 100) / 100
      ).toFixed(2);
    }

    if (this.gameCore.sceneNeedsToBeChanged && this.gameCore.sceneCanBeLoaded) {
      if (this.gameCore.sceneNeedsToBeCleaned) {
        SceneProvider.unloadScene();
        this.gameCore.sceneNeedsToBeCleaned = false;
        this.gameCore.sceneNeedsLoadClass = true;
      }

      if (this.gameCore.sceneNeedsLoadClass) {
        if (this.gameCore.sceneToBeLoaded) {
          SceneProvider.loadScene(this.gameCore.sceneToBeLoaded);
          this.gameCore.sceneNeedsLoadClass = false;
          this.gameCore.sceneToBeLoaded = null;
        }
      }

      if (
        SceneProvider.current &&
        !this.gameCore.sceneNeedsLoadClass &&
        !this.gameCore.sceneNeedsToBeCleaned
      ) {
        if (
          SceneProvider.current.isLoaded &&
          !SceneProvider.current.isLoading
        ) {
          this.gameCore.sceneNeedsToBeChanged = false;
          this.gameCore.sceneCanBeLoaded = false;
          this.gameCore.fadeStateNeedsChanged = true;
        }
      }
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

    this.changeScene("StartScene");
    this.loop.Start();
  };

  public changeScene = (name: string): void => {
    this.gameCore.sceneToBeLoaded = name;
    this.gameCore.fadeStateNeedsChanged = true;
    this.gameCore.sceneNeedsToBeCleaned = true;
    this.gameCore.sceneNeedsToBeChanged = true;
  };
}
