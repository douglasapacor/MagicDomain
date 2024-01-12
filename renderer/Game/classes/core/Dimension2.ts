export class Dimension2 {
  public readonly width: number;
  public readonly height: number;

  constructor(width = 0, height = 0) {
    this.width = width;
    this.height = height;
  }

  public duplicate = (): Dimension2 => {
    return new Dimension2(this.width, this.height);
  };
}
