export class GameLoop {
  private update: Function;
  private lastFrameTime: number = 0;
  private accumulatedTime: number = 0;
  private timeStep: number = 1000 / 60;
  private rafId: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;

  constructor(update: Function) {
    this.update = update;
  }

  private mainLoop = () => {
    if (!this.isRunning) return;

    const timeStamp = new Date().getTime();

    let deltaTime = timeStamp - this.lastFrameTime;

    this.lastFrameTime = timeStamp;

    this.accumulatedTime += deltaTime;

    this.update(this.timeStep);
  };

  public start = () => {
    if (!this.isRunning) {
      this.isRunning = true;
      this.rafId = setInterval(this.mainLoop, this.timeStep);
    }
  };

  stop = () => {
    if (this.rafId) clearInterval(this.rafId);
    this.isRunning = false;
  };
}
