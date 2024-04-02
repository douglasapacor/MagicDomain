import { TextHolder } from "./TextHolder";

export class TextHolderFactory {
  private readonly registry: Map<string, typeof TextHolder> = new Map();

  constructor() {}

  public register(
    textHolderName: string,
    textHolderClass: typeof TextHolder,
  ): void {
    this.registry.set(textHolderName, textHolderClass);
  }

  public create(textHolderName: string): TextHolder {
    const textHolderClass = this.registry.get(textHolderName);
    return new textHolderClass(textHolderName);
  }
}

