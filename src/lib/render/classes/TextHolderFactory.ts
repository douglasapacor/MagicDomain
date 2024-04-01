import { TextHolder } from "./TextHolder";

export class TextHolderFactory {
  private static readonly registry: Map<string, typeof TextHolder> = new Map();

  private constructor() {}

  public static register(
    textHolderName: string,
    textHolderClass: typeof TextHolder,
  ): void {
    this.registry.set(textHolderName, textHolderClass);
  }

  public static create(textHolderName: string): TextHolder {
    const textHolderClass = this.registry.get(textHolderName);
    return new textHolderClass(textHolderName);
  }
}

