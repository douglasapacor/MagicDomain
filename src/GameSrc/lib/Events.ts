export class Events {
  public callbacks: {
    id: number;
    eventName: string;
    caller: unknown;
    callback: Function;
  }[];
  public nextId: number;

  constructor() {
    this.nextId = 0;
    this.callbacks = [];
  }

  emit(eventName: string, value: unknown) {
    this.callbacks.forEach((stored) => {
      if (stored.eventName === eventName) {
        stored.callback(value);
      }
    });
  }

  on(eventName: string, caller: unknown, callback: Function) {
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

  unsubscribe(caller: unknown) {
    this.callbacks = this.callbacks.filter(
      (stored) => stored.caller !== caller
    );
  }
}
