import { gameCore, gameEvents, Scene, SceneFactory, SceneProvider } from "..";
import { GAME_EVENTS } from "../../../statics/eventlist";
import { GameLog } from "./GameLog";
import { Html } from "./Html";
import { Loop } from "./Loop";

export class Game {
  private loop: Loop;
  private structure: Html;
  private log: GameLog;
  private core: gameCore;

  constructor(private scenes: { [key: string]: typeof Scene }) {
    this.structure = new Html();
    this.loop = new Loop(this.Update, this.Draw);
    this.log = new GameLog();
    this.core = {
      fadeState: "in",
      zIndex: 0,
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

  private calculateElapsedTime = (): void => {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - this.log.startedAt.getTime();
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

    this.log.elapsedTime = {
      days,
      hour,
      minute,
      seconds,
      miliseconds,
    };
  };

  private Draw = (): void => {
    this.structure.context.clearRect(
      0,
      0,
      this.structure.canvas.width,
      this.structure.canvas.height,
    );

    this.structure.context.save();

    if (SceneProvider.current) {
      if (SceneProvider.current.loadSceneComplete)
        SceneProvider.current.draw(this.structure.context, 0, 0);
    }

    this.structure.context.restore();
  };

  private Update = (delta: number): void => {
    if (this.core.fadeStateNeedsChanged) {
      const opacityTarget = this.core.fadeState === "in" ? 0 : 1;
      const fadeAmount =
        (opacityTarget - this.core.viewOpacity) / (20 * this.loop.timeStep);

      if (
        opacityTarget === 1 &&
        this.structure.overlay.style.display === "none"
      )
        this.structure.overlay.style.display = "block";

      this.core.viewOpacity += fadeAmount * delta;

      if (this.core.fadeState === "in" && this.core.viewOpacity <= 0.01) {
        this.structure.overlay.style.opacity = "0";
        this.structure.overlay.style.display = "none";
        this.core.viewOpacity = 0;
        this.core.fadeState = "out";
        this.core.fadeStateNeedsChanged = false;
        this.core.sceneCanBeLoaded = false;
      }

      if (this.core.fadeState === "out" && this.core.viewOpacity >= 0.99) {
        this.structure.overlay.style.opacity = "1";
        this.core.viewOpacity = 1;
        this.core.fadeState = "in";
        this.core.fadeStateNeedsChanged = false;
        this.core.sceneCanBeLoaded = true;
      }

      this.structure.overlay.style.opacity = (
        Math.round((this.core.viewOpacity + Number.EPSILON) * 100) / 100
      ).toFixed(2);
    }

    if (this.core.sceneNeedsToBeChanged && this.core.sceneCanBeLoaded) {
      if (this.core.sceneNeedsToBeCleaned) {
        SceneProvider.unloadScene();
        this.core.sceneNeedsToBeCleaned = false;
        this.core.sceneNeedsLoadClass = true;
      }

      if (this.core.sceneNeedsLoadClass) {
        if (this.core.sceneToBeLoaded) {
          SceneProvider.loadScene(this.core.sceneToBeLoaded);
          this.core.sceneNeedsLoadClass = false;
          this.core.sceneToBeLoaded = null;
        }
      }

      if (
        SceneProvider.current &&
        !this.core.sceneNeedsLoadClass &&
        !this.core.sceneNeedsToBeCleaned
      ) {
        if (SceneProvider.current.loadSceneComplete) {
          this.core.sceneNeedsToBeChanged = false;
          this.core.sceneCanBeLoaded = false;
          this.core.fadeStateNeedsChanged = true;
        }
      }
    }

    if (SceneProvider.current) SceneProvider.current.StepEntry(delta);

    this.calculateElapsedTime();
  };

  public start = (): void => {
    Object.keys(this.scenes).forEach(sceneName =>
      SceneFactory.register(sceneName, this.scenes[sceneName]),
    );

    this.changeScene("StartScene");
    this.loop.Start();
  };

  public changeScene = (name: string): void => {
    this.core.sceneToBeLoaded = name;
    this.core.fadeStateNeedsChanged = true;
    this.core.sceneNeedsToBeCleaned = true;
    this.core.sceneNeedsToBeChanged = true;
  };
}
