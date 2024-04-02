import {
  gameEvents,
  Scene,
  sceneFactory,
  sceneProvider,
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
  public faded: boolean;

  constructor(
    private scenes: { [key: string]: typeof Scene },
    private textHolders: { [key: string]: typeof TextHolder },
  ) {
    this.html = new Html();
    this.loop = new Loop(this.Update, this.Draw);
    this.gameLog = new GameLog();

    gameEvents.on("fadeOut", this, this.fadeOut);
    gameEvents.on("fadeIn", this, this.fadeIn);

    Object.keys(this.scenes).forEach(sceneName =>
      sceneFactory.register(sceneName, this.scenes[sceneName]),
    );

    Object.keys(this.textHolders).forEach(textHolderName =>
      textHolderFactory.register(
        textHolderName,
        this.textHolders[textHolderName],
      ),
    );

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

    if (sceneProvider.current)
      if (sceneProvider.current.isLoaded) {
        sceneProvider.current.draw(this.html.context, 0, 0);
      }

    this.html.context.restore();
  };

  private Update = (delta: number): void => {
    if (sceneProvider.current) {
      sceneProvider.current.stepEntry(delta);
    }

    this.calculateElapsedTime();
  };

  public Start = (): void => {
    sceneProvider.loadScene("StartScene");
    this.loop.Start();
  };

  public fadeOut = async (duracao: number): Promise<void> => {
    let opacidade = 1;

    const intervaloFade = setInterval(() => {
      opacidade -= 0.01;

      this.html.overlay.style.opacity = opacidade.toString();

      if (opacidade <= 0) {
        clearInterval(intervaloFade);
        this.html.overlay.style.opacity = "0";
        this.faded = false;
      }
    }, duracao / 100);

    await new Promise(resolve => setTimeout(resolve, duracao));
  };

  public fadeIn = async (duracao: number): Promise<void> => {
    let opacidade = 0;

    const intervaloFade = setInterval(() => {
      opacidade += 0.01;

      this.html.overlay.style.opacity = opacidade.toString();

      if (opacidade >= 1) {
        this.faded = true;
        clearInterval(intervaloFade);
        this.html.overlay.style.opacity = "1";
      }
    }, duracao / 100);

    await new Promise(resolve => setTimeout(resolve, duracao));
  };
}
