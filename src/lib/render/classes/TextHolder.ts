import { DataHolder } from "./DataHolder";

export class TextHolder extends DataHolder {
  private _texts: Map<string | number, string> = new Map();

  constructor(name: string) {
    super(name);
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

  public override getData(): TextHolder {
    return this;
  }
}

