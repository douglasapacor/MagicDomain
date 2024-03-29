import { generateKey } from "../helpers/randoms";
import { GameObject } from "./GameObject";
import { animationConfig } from "./types/animationConfig";

export class FrameIndexPattern extends GameObject {
  public currentTime: number;
  public duration: number;
  public animationConfig: animationConfig;

  constructor(animationConfig: animationConfig, name?: string) {
    super(
      name
        ? name + "_frameIndexPattern"
        : `${generateKey(5)}_frameIndexPattern`,
    );
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
    throw "O tempo é anterior ao primeiro quadro-chave";
  }

  public override step(delta: number) {
    this.currentTime += delta;
    if (this.currentTime >= this.duration) {
      this.currentTime = 0;
    }
  }
}
