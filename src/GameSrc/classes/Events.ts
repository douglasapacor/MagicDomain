import { IEventCallback } from "./Interfaces/IEventCallback";
import { IEventRegistration } from "./Interfaces/IEventRegistration";

export class Events {
  public callbacks: IEventRegistration[] = [];
  public nextId: number;

  constructor() {
    this.nextId = 0;
    this.callbacks = [];
  }

  public emit(eventName: string, value: unknown): void {
    this.callbacks.forEach((stored) => {
      if (stored.eventName === eventName) {
        stored.callback(value);
      }
    });
  }

  public on(
    eventName: string,
    caller: unknown,
    callback: IEventCallback
  ): number {
    this.nextId += 1;
    this.callbacks.push({
      id: this.nextId,
      eventName,
      caller,
      callback,
    });
    return this.nextId;
  }

  public off(id: number): void {
    this.callbacks = this.callbacks.filter((stored) => stored.id !== id);
  }

  public unsubscribe(caller: unknown): void {
    this.callbacks = this.callbacks.filter(
      (stored) => stored.caller !== caller
    );
  }
}
