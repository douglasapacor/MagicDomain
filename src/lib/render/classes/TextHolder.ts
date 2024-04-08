export class TextHolder {
  private readonly _name: string;
  private _texts: Map<string | number, string> = new Map();

  constructor(name: string) {
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }

  public addLine(key: string | number, value: string): void {
    this._texts.set(key, value);
  }

  public get texts(): Map<string | number, string> {
    return this._texts;
  }

  public getText(key: string | number): string | undefined {
    return this._texts.get(key);
  }

  public getData(): TextHolder {
    return this;
  }
}

