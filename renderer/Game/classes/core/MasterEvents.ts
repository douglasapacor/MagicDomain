import { eventCallBacksType } from "../../types/eventCallBacksType";

export class MasterEvents {
  private callbacks: eventCallBacksType[] = [];
  private nextId: number = 0;

  emit(eventName: string, value: any) {
    this.callbacks.forEach((stored) => {
      if (stored.eventName === eventName) {
        stored.callback(value);
      }
    });
  }

  on(eventName: string, caller: any, callback: Function) {
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

  unsubscribe(caller: any) {
    this.callbacks = this.callbacks.filter(
      (stored) => stored.caller !== caller
    );
  }
}