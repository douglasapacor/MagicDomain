import { keyboardEvents } from "../";

export class Input {
  private heldDirections: Set<string>;

  constructor() {
    this.heldDirections = new Set();
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
  }

  private onKeyDown = (e: KeyboardEvent) => {
    const direction = this.getKeyDirection(e.code);

    if (direction) {
      this.heldDirections.add(direction);
      keyboardEvents.emit("keyPressed", { direction });
    }
  };

  private onKeyUp = (e: KeyboardEvent) => {
    const direction = this.getKeyDirection(e.code);

    if (direction) {
      this.heldDirections.delete(direction);
      keyboardEvents.emit("keyReleased", { direction });
    }
  };

  private getKeyDirection(code: string): string | undefined {
    if (code === "ArrowUp" || code === "KeyW") return "UP";
    if (code === "ArrowDown" || code === "KeyS") return "DOWN";
    if (code === "ArrowLeft" || code === "KeyA") return "LEFT";
    if (code === "ArrowRight" || code === "KeyD") return "RIGHT";
    if (code === "Space") return "JUMP";
    return undefined;
  }

  public get directions(): string[] {
    return Array.from(this.heldDirections);
  }
}
