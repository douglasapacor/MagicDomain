import { eventCallBacksType } from "../types/eventCallBacksType";
import { GameObject } from "./GameObject";

export class Event {
  private callbacks: eventCallBacksType[] = [];
  private nextId: number;

  constructor() {
    this.nextId = 0;
  }

  emit(eventName: string, value: any) {
    this.callbacks.forEach((stored) => {
      if (stored.eventName === eventName) {
        stored.callback(value);
      }
    });
  }

  on(eventName: string, caller: GameObject, callback: Function) {
    this.nextId += 1;

    this.callbacks.push({
      id: this.nextId,
      eventName,
      caller,
      callback,
    });

    return this.nextId;
  }

  off(id: number) {
    this.callbacks = this.callbacks.filter((stored) => stored.id !== id);
  }

  unsubscribe(caller: GameObject) {
    this.callbacks = this.callbacks.filter(
      (stored) => stored.caller !== caller
    );
  }
}
