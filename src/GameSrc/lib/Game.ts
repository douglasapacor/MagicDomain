import { Html, Loop, Scene, gameEvents } from "..";
import { PresentationScene } from "../scenes/PresentationScene";

export class Game {
  private scene: Scene | null;
  private scenes: Scene[];
  private loop: Loop;
  private html: Html;
  private gameLog: {
    startedAt: Date;
    elapsedTime: {
      days: number;
      hour: number;
      minute: number;
      seconds: number;
      miliseconds: number;
    };
  };

  constructor() {
    this.scene = null;
    this.scenes = [];
    this.loop = new Loop(this.update, this.draw);
    this.html = new Html();

    this.gameLog = {
      startedAt: new Date(),
      elapsedTime: {
        days: 0,
        hour: 0,
        minute: 0,
        seconds: 0,
        miliseconds: 0,
      },
    };

    this.scenes.push(
      new PresentationScene({
        width: this.html.canvas.width,
        heigth: this.html.canvas.height,
      })
    );

    gameEvents.on("unload_scene", this, () => {
      this.scene = null;
    });
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
    const hours = Math.floor(
      remainingMillisecondsAfterDays / millisecondsInHour
    );
    const remainingMillisecondsAfterHours =
      remainingMillisecondsAfterDays % millisecondsInHour;
    const minutes = Math.floor(
      remainingMillisecondsAfterHours / millisecondsInMinute
    );
    const remainingMillisecondsAfterMinutes =
      remainingMillisecondsAfterHours % millisecondsInMinute;
    const seconds = Math.floor(
      remainingMillisecondsAfterMinutes / millisecondsInSecond
    );
    const remainingMillisecondsAfterSeconds =
      remainingMillisecondsAfterMinutes % millisecondsInSecond;
    const milliseconds = remainingMillisecondsAfterSeconds;

    this.gameLog.elapsedTime = {
      days,
      hour: hours,
      minute: minutes,
      seconds,
      miliseconds: milliseconds,
    };
  }

  private update = (delta: number): void => {
    if (this.scene) this.scene.StepEntry(delta);

    this.calculateElapsedTime();
  };

  private draw = (): void => {
    this.html.ctx.clearRect(
      0,
      0,
      this.html.canvas.width,
      this.html.canvas.height
    );

    this.html.ctx.save();

    this.html.ctx.font = "32px PixGamer";
    // this.html.ctx.textAlign = "center";
    this.html.ctx.fillText(
      `Magic Domain D:${this.gameLog.elapsedTime.hour} H:${this.gameLog.elapsedTime.hour} M:${this.gameLog.elapsedTime.minute} S:${this.gameLog.elapsedTime.seconds}`,
      200,
      100
    );

    if (this.scene) {
      if (this.scene.sceneCamera)
        this.html.ctx.translate(
          this.scene.sceneCamera.position.x,
          this.scene.sceneCamera.position.y
        );

      this.scene.Draw(this.html.ctx, 0, 0);
    }

    this.html.ctx.restore();
  };

  public Start = (): void => {
    this.loop.Start();
  };
}
