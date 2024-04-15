import {
  animationEvents,
  IAddEventListener,
  INotifyEvent,
  IRemoveEventListener,
} from "..";
import { FrameIndexPattern } from "./FrameIndexPattern";

export class Animation {
  public patterns: Record<string, FrameIndexPattern>;
  public activeKey: keyof Record<string, FrameIndexPattern>;

  constructor(patterns: Record<string, FrameIndexPattern>) {
    this.patterns = patterns;
    this.activeKey = Object.keys(this.patterns)[0];
  }

  public get frame() {
    return this.patterns[this.activeKey].frame;
  }

  public get animationNames(): string[] {
    return Object.keys(this.patterns);
  }

  public Play(key: string, startAtTime = 0): void {
    if (this.activeKey === key) {
      return;
    }

    this.activeKey = key;
    this.patterns[this.activeKey].currentTime = startAtTime;
  }

  public Step(delta: number): void {
    this.patterns[this.activeKey].Step(delta);
  }

  public HasAnimation(name: string): boolean {
    return this.patterns[name] !== undefined;
  }

  public GetAnimationFrame(name: string): number {
    if (!this.patterns[name] !== undefined) {
      throw new Error(`Animation '${name}' does not exist`);
    }

    return this.patterns[name].frame;
  }

  public GetAnimationFrameDuration(name: string): number {
    if (!this.patterns[name] !== undefined) {
      throw new Error(`Animation '${name}' does not exist`);
    }

    return this.patterns[name].duration;
  }

  public IsPlaying(name: string): boolean {
    return this.activeKey === name;
  }

  public Stop(name: string): void {
    if (!this.patterns[name] !== undefined) {
      throw new Error(`Animation '${name}' does not exist`);
    }

    if (this.activeKey === name) {
      this.activeKey = Object.keys(this.patterns)[0];
    }
  }

  public Reset(name: string): void {
    if (!this.patterns[name] !== undefined) {
      throw new Error(`Animation '${name}' does not exist`);
    }

    if (this.activeKey === name) {
      this.patterns[name].currentTime = 0;
    }
  }

  public SetAnimationFrame(name: string, frame: number): void {
    if (!this.patterns[name] !== undefined) {
      throw new Error(`Animation '${name}' does not exist`);
    }

    this.patterns[name].currentTime =
      (frame / this.patterns[name].animationConfig.frames.length) *
      this.patterns[name].duration;
  }

  public AddEventListener(params: IAddEventListener): number {
    if (!this.patterns[params.name] !== undefined) {
      throw new Error(`Animação '${name}' Não existe`);
    }

    const id = animationEvents.on(
      `${params.name}:${params.event}`,
      this,
      params.listener,
    );

    return id;
  }

  public NotifyEvent(params: INotifyEvent): void {
    if (!this.patterns[params.name] !== undefined)
      throw new Error(`Animação '${params.name}' Não existe`);

    animationEvents.emit(`${params.name}:${params.event}`, params.value);
  }

  public RemoveEventListener(params: IRemoveEventListener): void {
    if (!this.patterns[params.name] !== undefined) {
      throw new Error(`Animação '${params.name}' Não existe`);
    }

    animationEvents.off(params.listenerId);
  }
}
