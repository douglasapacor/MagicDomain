import { textHolderFactory } from "..";
import { TextHolder } from "./TextHolder";

export class TextHolderProvider {
  private _current: TextHolder | null = null;

  constructor() {
    this._current = null;
  }

  public loadTextHolder(name: string) {
    this._current = textHolderFactory.create(name);
  }

  public get current(): TextHolder {
    return this._current;
  }
}

