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
    this.loop = new Loop(this.Update, this.Draw);
    this.html = new Html();
    this.gameLog = new GameLog();
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
}
