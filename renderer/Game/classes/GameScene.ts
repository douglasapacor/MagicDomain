import { GameObject } from "./GameObject";
import { Input } from "./Input";
import { Vector2 } from "./Vector2";

export class GameScene extends GameObject {
  public input?: Input | null;

  constructor(name: string) {
    super(new Vector2(0, 0), name);
  }
}
