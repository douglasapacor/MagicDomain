export class GameLoop {
  private update: Function;
  private renderer: Function;
  private lastFrameTime: number = 0;
  private accumulatedTime: number = 0;
  private timeStep: number = 1000 / 60;
  private rafId: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;

  constructor(update: Function, renderer: Function) {
    this.update = update;
    this.renderer = renderer;
  }

  private mainLoop = () => {
    if (!this.isRunning) return;

    const timeStamp = new Date().getTime();

    let deltaTime = timeStamp - this.lastFrameTime;
    this.lastFrameTime = timeStamp;
    console.log("timeStamp", timeStamp);

    this.accumulatedTime += deltaTime;

    while (this.accumulatedTime >= this.timeStep) {
      // this.update(this.timeStep);
      console.log(this.accumulatedTime);
      console.log(this.timeStep);

      this.accumulatedTime -= this.timeStep;
    }

    console.log("timeStamp", timeStamp);

    console.log("this.timeStep", this.timeStep);
    console.log("this.accumulatedTime", this.accumulatedTime);
    console.log("this.rafId", this.rafId);
    console.log("this.lastFrameTime", this.lastFrameTime);
    console.log("this.isRunning", this.isRunning);

    // this.renderer();
  };

  public start = () => {
    if (!this.isRunning) {
      this.isRunning = true;
      this.rafId = setInterval(this.mainLoop, this.timeStep);
    }
  };

  stop = () => {
    if (this.rafId) {
      clearInterval(this.rafId);
    }

    this.isRunning = false;
  };
}
