import {
  animationEvents,
  IAddEventListener,
  INotifyEvent,
  IRemoveEventListener,
} from "..";
import { FrameIndexPattern } from "./FrameIndexPattern";

export class Animation {
  public patterns: Record<string, FrameIndexPattern>;
  public activeKey: string;

  constructor(patterns: Record<string, FrameIndexPattern>) {
    this.patterns = patterns;
    this.activeKey = Object.keys(this.patterns)[0];
  }

  get frame() {
    return this.patterns[this.activeKey].frame;
  }

  public play(key: string, startAtTime = 0): void {
    if (this.activeKey === key) {
      return;
    }

    this.activeKey = key;
    this.patterns[this.activeKey].currentTime = startAtTime;
  }

  public step(delta: number): void {
    this.patterns[this.activeKey].step(delta);
  }

  public hasAnimation(name: string): boolean {
    return this.patterns[name] !== undefined;
  }

  public getAnimationNames(): string[] {
    return Object.keys(this.patterns);
  }

  public getAnimationFrame(name: string): number {
    if (!this.patterns[name] !== undefined) {
      throw new Error(`Animation '${name}' does not exist`);
    }

    return this.patterns[name].frame;
  }

  public getAnimationFrameDuration(name: string): number {
    if (!this.patterns[name] !== undefined) {
      throw new Error(`Animation '${name}' does not exist`);
    }

    return this.patterns[name].duration;
  }

  public isPlaying(name: string): boolean {
    return this.activeKey === name;
  }

  public stop(name: string): void {
    if (!this.patterns[name] !== undefined) {
      throw new Error(`Animation '${name}' does not exist`);
    }

    if (this.activeKey === name) {
      this.activeKey = Object.keys(this.patterns)[0];
    }
  }

  public reset(name: string): void {
    if (!this.patterns[name] !== undefined) {
      throw new Error(`Animation '${name}' does not exist`);
    }

    if (this.activeKey === name) {
      this.patterns[name].currentTime = 0;
    }
  }

  public setAnimationFrame(name: string, frame: number): void {
    if (!this.patterns[name] !== undefined) {
      throw new Error(`Animation '${name}' does not exist`);
    }

    this.patterns[name].currentTime =
      (frame / this.patterns[name].animationConfig.frames.length) *
      this.patterns[name].duration;
  }

  public addEventListener(params: IAddEventListener): number {
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

  public notifyEvent(params: INotifyEvent): void {
    if (!this.patterns[params.name] !== undefined)
      throw new Error(`Animação '${params.name}' Não existe`);

    animationEvents.emit(`${params.name}:${params.event}`, params.value);
  }

  public removeEventListener(params: IRemoveEventListener): void {
    if (!this.patterns[params.name] !== undefined) {
      throw new Error(`Animação '${params.name}' Não existe`);
    }

    animationEvents.off(params.listenerId);
  }
}
