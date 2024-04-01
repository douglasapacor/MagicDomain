import { TextHolder } from "./TextHolder";
import { TextHolderFactory } from "./TextHolderFactory";

export class TextHolderProvider {
  private static textHolder: TextHolder | null = null;

  private constructor() {}

  public static loadTextHolder(name: string) {
    this.textHolder = TextHolderFactory.create(name);
  }

  public static get current(): TextHolder {
    return this.textHolder;
  }
}

