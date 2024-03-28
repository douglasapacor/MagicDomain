import { gameEvents, Scene, SceneFactory, SceneProvider } from "..";
import { GameLog } from "./GameLog";
import { Html } from "./Html";
import { Loop } from "./Loop";

export class Game {
  private loop: Loop;
  private html: Html;
  private gameLog: GameLog;

  constructor(private scenes: { [key: string]: typeof Scene }) {
    this.html = new Html();
    this.loop = new Loop(this.Update, this.Draw);
    this.gameLog = new GameLog();

    gameEvents.on("fadeOut", this, this.fadeOut);
    gameEvents.on("fadeIn", this, this.fadeIn);

    Object.keys(this.scenes).forEach(itens =>
      SceneFactory.register(itens, this.scenes[itens]),
    );
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

    if (SceneProvider.current)
      SceneProvider.current.draw(this.html.context, 0, 0);

    this.html.context.restore();
  };

  private Update = (delta: number): void => {
    SceneProvider.current && SceneProvider.current.stepEntry(delta);
    this.calculateElapsedTime();
  };

  public Start = (): void => {
    this.loop.Start();
  };

  protected async fadeOut(duracao: number): Promise<void> {
    let opacidade = 1;
    const intervaloFade = setInterval(() => {
      opacidade -= 0.01;
      this.html.overlay.style.opacity = opacidade.toString();
      if (opacidade <= 0) {
        clearInterval(intervaloFade);
      }
    }, duracao / 100);
    await new Promise(resolve => setTimeout(resolve, duracao));
  }

  protected async fadeIn(duracao: number): Promise<void> {
    let opacidade = 0;
    const intervaloFade = setInterval(() => {
      opacidade += 0.01;
      this.html.overlay.style.opacity = opacidade.toString();
      if (opacidade >= 1) {
        clearInterval(intervaloFade);
        this.html.overlay.style.opacity = "1";
      }
    }, duracao / 100);
    await new Promise(resolve => setTimeout(resolve, duracao));
  }
}
