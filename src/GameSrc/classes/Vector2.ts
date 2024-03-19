export class Vector2 {
  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public duplicate(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  public equals(other: Vector2): boolean {
    return this.x === other.x && this.y === other.y;
  }
}
