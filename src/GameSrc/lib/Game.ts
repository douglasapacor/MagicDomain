import { Html, Loop, Scene, StudioScene, gameEvents } from "..";
import { PresentationScene } from "../scenes/PresentationScene";

type gameLog = {
  startedAt: Date;
  elapsedTime: {
    days: number;
    hour: number;
    minute: number;
    seconds: number;
    miliseconds: number;
  };
};

export class Game {
  private scene: Scene | null;
  private scenes: Scene[];
  private loop: Loop;
  private html: Html;
  private gameLog: gameLog;

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
      }),
      new StudioScene({
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
    const hour = Math.floor(
      remainingMillisecondsAfterDays / millisecondsInHour
    );
    const remainingMillisecondsAfterHours =
      remainingMillisecondsAfterDays % millisecondsInHour;
    const minute = Math.floor(
      remainingMillisecondsAfterHours / millisecondsInMinute
    );
    const remainingMillisecondsAfterMinutes =
      remainingMillisecondsAfterHours % millisecondsInMinute;
    const seconds = Math.floor(
      remainingMillisecondsAfterMinutes / millisecondsInSecond
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

    // this.html.ctx.font = "22px PixGamer";
    // this.html.ctx.fillText(
    //   `Magic Domain® v1.0.0 - ${this.gameLog.elapsedTime.hour}d ${this.gameLog.elapsedTime.hour}h ${this.gameLog.elapsedTime.minute}m ${this.gameLog.elapsedTime.seconds}s`,
    //   20,
    //   30
    // );

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
