import { animationConfig } from "./types/animationConfig";

export class FrameIndexPattern {
  private readonly _name: string;
  private _currentTime: number;
  private _duration: number;
  private _animationConfig: animationConfig;

  constructor(animationConfig: animationConfig, name?: string) {
    this._name = `${name}_frameIndexPattern`;
    this._currentTime = 0;
    this._animationConfig = animationConfig;
    this._duration = animationConfig.duration ?? 500;
  }

  get frame() {
    const { frames } = this._animationConfig;
    for (let i = frames.length - 1; i >= 0; i--) {
      if (this._currentTime >= frames[i].time) {
        return frames[i].frame;
      }
    }
    throw "O tempo é anterior ao primeiro quadro-chave";
  }

  public Step(delta: number) {
    this._currentTime += delta;
    if (this._currentTime >= this._duration) this._currentTime = 0;
  }

  public get duration(): number {
    return this._duration;
  }

  public get animationConfig(): animationConfig {
    return this._animationConfig;
  }

  public get currentTime(): number {
    return this._currentTime;
  }

  public set currentTime(currentTime: number) {
    this._currentTime = currentTime;
  }
}
