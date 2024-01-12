export class Dimension {
  public readonly width: number;
  public readonly height: number;

  constructor(width = 0, height = 0) {
    this.width = width;
    this.height = height;
  }

  public duplicate = (): Dimension => {
    return new Dimension(this.width, this.height);
  };
}
