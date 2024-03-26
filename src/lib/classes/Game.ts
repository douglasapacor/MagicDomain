import { StartScene } from "../../scenes/StartScene";
import { GameLog } from "./GameLog";
import { Html } from "./Html";
import { Loop } from "./Loop";
import { Scene } from "./Scene";

export class Game {
  private loop: Loop;
  private html: Html;
  private gameLog: GameLog;
  private currentScene: Scene | null;

  constructor() {
    this.html = new Html();
    this.loop = new Loop(this.Update, this.Draw);
    this.gameLog = new GameLog();
    this.loadScene();
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

    if (this.currentScene) this.currentScene.draw(this.html.context, 0, 0);

    this.html.context.restore();
  };

  private Update = (delta: number): void => {
    this.currentScene && this.currentScene.stepEntry(delta);
    this.calculateElapsedTime();
  };

  public Start = (): void => this.loop.Start();

  private async loadScene(): Promise<void> {
    if (this.currentScene) await this.fadeOut(3000);
    this.currentScene = new StartScene();
    await this.fadeIn(3000);
  }

  private async fadeOut(duracao: number): Promise<void> {
    console.log("fadeOut");
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

  private async fadeIn(duracao: number): Promise<void> {
    console.log("fadeIn");
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
