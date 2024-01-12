import { Vector2 } from "../classes";
import { ButtonUI } from "../classes/UI/ButtonUI";
import { UI } from "../classes/UI/UI";
import { Dimension } from "../classes/core/Dimension";

export class PlayerCharacterUI extends UI {
  constructor(position?: { x: number; y: number }) {
    super(position ? new Vector2(position.x, position.y) : new Vector2(0, 0));
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const startGame = new ButtonUI(
      "Start Game",
      "#eeaa00",
      "#001122",
      new Dimension(100, 50),
      new Vector2(this.position.x, this.position.y)
    );
    startGame.draw(ctx);
  }
}
