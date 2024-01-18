export class GameLoop {
  private isRunning: boolean;
  private isPaused: boolean;
  private lastFrameTime: number;
  private accumulatedTime: number;
  private timeStep: number;
  private loopId: NodeJS.Timeout = null;

  public update: (delta: number) => void;
  public draw: () => void;

  constructor(update: (delta: number) => void, draw: () => void) {
    this.lastFrameTime = 0;
    this.accumulatedTime = 0;
    this.timeStep = 1000 / 60;
    this.isRunning = false;
    this.isPaused = false;

    this.update = update;
    this.draw = draw;
  }

  public mainLoop(): void {
    if (!this.isRunning) return;
    if (this.isPaused) return;

    const timeStamp = Date.now();
    const deltaTime = timeStamp - this.lastFrameTime;

    this.lastFrameTime = timeStamp;
    this.accumulatedTime += deltaTime;

    this.update(deltaTime);
    this.draw();
  }

  public start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.loopId = setInterval(() => {
        this.mainLoop();
      }, this.timeStep);
      console.log(this.loopId);
    }
  }

  public stop() {
    if (this.loopId) {
      clearInterval(this.loopId);
      this.loopId = null;
    }
    this.isRunning = false;
  }
}
