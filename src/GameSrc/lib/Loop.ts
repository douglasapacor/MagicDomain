export class Loop {
  private isRunning: boolean;
  private lastFrameTime: number;
  private accumulatedTime: number;
  private processId: NodeJS.Timeout | null;
  private timeStep: number;
  private update: (delta: number) => void;
  private draw: () => void;

  constructor(update: (delta: number) => void, draw: () => void) {
    this.processId = null;
    this.lastFrameTime = 0;
    this.accumulatedTime = 0;
    this.timeStep = 1000 / 60;
    this.update = update;
    this.draw = draw;
  }

  private Main = (): void => {
    if (!this.isRunning) return;

    const timeStamp = Date.now();
    const deltaTime = timeStamp - this.lastFrameTime;

    this.lastFrameTime = timeStamp;
    this.accumulatedTime += deltaTime;

    this.update(deltaTime);
    this.draw();
  };

  public Start = (): void => {
    if (!this.isRunning) {
      this.isRunning = true;
      this.processId = setInterval(this.Main, this.timeStep);
    }
  };

  public Stop = (): void => {
    if (this.processId) clearInterval(this.processId);

    this.isRunning = false;
  };
}
