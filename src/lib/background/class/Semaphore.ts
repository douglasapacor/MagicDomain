export class Semaphore {
  private _value: number;
  private _queue: Function[];

  constructor(initialValue: number) {
    this._value = initialValue;
    this._queue = [];
  }

  acquire() {
    return new Promise((resolve: (value?: unknown) => void): void => {
      if (this._value > 0) {
        this._value--;
        resolve();
      } else {
        this._queue.push(resolve);
      }
    });
  }

  release() {
    if (this._queue.length > 0) {
      const resolve = this._queue.shift();
      resolve();
    } else {
      this._value++;
    }
  }
}

