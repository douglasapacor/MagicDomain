type animationConfig = {
  duration: number;
  frames: frameConfigType[];
};

type frameConfigType = {
  time: number;
  frame: number;
};

export class FrameIndexPattern {
  public currentTime: number;
  public duration: number;
  public animationConfig: animationConfig;

  constructor(animationConfig: animationConfig) {
    this.currentTime = 0;
    this.animationConfig = animationConfig;
    this.duration = animationConfig.duration ?? 500;
  }

  get frame() {
    const { frames } = this.animationConfig;
    for (let i = frames.length - 1; i >= 0; i--) {
      if (this.currentTime >= frames[i].time) {
        return frames[i].frame;
      }
    }
    throw "Time is before the first keyframe";
  }

  step(delta: number) {
    this.currentTime += delta;
    if (this.currentTime >= this.duration) {
      this.currentTime = 0;
    }
  }
}
