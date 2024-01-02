/* eslint-disable @typescript-eslint/no-explicit-any */
import { eventCallbacks } from "../types/eventCallbacks";
import { GameObject } from "./GameObject";

class Events {
  public callbacks: eventCallbacks[];
  public nextId: number;

  constructor() {
    this.callbacks = [];
    this.nextId = 0;
  }

  emit(eventName: string, value: any) {
    this.callbacks.forEach((stored) => {
      if (stored.eventName === eventName) {
        stored.callback(value);
      }
    });
  }

  on(eventName: string, caller: GameObject, callback: () => void) {
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

export const events = new Events();