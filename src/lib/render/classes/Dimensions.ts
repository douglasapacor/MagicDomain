export class Dimensions {
  public readonly width: number;
  public readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public duplicate(): Dimensions {
    return new Dimensions(this.width, this.height);
  }

  public equals(other: Dimensions): boolean {
    return this.width === other.width && this.height === other.height;
  }
}

