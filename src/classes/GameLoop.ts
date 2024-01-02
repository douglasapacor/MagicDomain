export class GameLoop {
  private lastFrameTime: number;
  private accumulatedTime: number;
  private timeStep: number;
  private timeSize: number;
  private frameCount: number;
  private rafId: number | null;
  private isRunning: boolean;
  private update: (deltaTime: number) => void;
  private render: () => void;

  constructor(update: (deltaTime: number) => void, render: () => void) {
    this.lastFrameTime = 0;
    this.accumulatedTime = 0;
    this.timeSize = 1000;
    this.frameCount = 60;
    this.timeStep = this.timeSize / this.frameCount;

    this.rafId = null;
    this.isRunning = false;

    this.update = update;
    this.render = render;
  }

  mainLoop = (timestamp: number) => {
    if (!this.isRunning) return;

    const deltaTime: number = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    this.accumulatedTime += deltaTime;

    while (this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep);
      this.accumulatedTime -= this.timeStep;
    }

    this.render();

    this.rafId = requestAnimationFrame(this.mainLoop);
  };

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.rafId = requestAnimationFrame(this.mainLoop);
    }
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.isRunning = false;
  }
}
