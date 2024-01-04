export class Vector2 {
  public readonly x: number;
  public readonly y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  public duplicate = (): Vector2 => {
    return new Vector2(this.x, this.y);
  };
}
