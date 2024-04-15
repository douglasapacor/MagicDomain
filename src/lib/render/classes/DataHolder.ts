/* eslint-disable @typescript-eslint/no-explicit-any */
export class DataHolder {
  [x: string]: any;
  private readonly _name: string;

  constructor(name: string) {
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }

  public getData(): this {
    return this;
  }
}
