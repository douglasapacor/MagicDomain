import { Dimension, GameScene, UI, Vector2 } from "./";

export class UIComponent {
  public parent: UI | null;
  public name: string;
  public position: Vector2;
  public dimension: Dimension;
  private hasReadyBeenCalled: boolean;
  public onClick?: () => void;
  public onMouseOver?: () => void;

  constructor(name: string, position?: Vector2, dimension?: Dimension) {
    this.name = name;
    this.position = position ?? new Vector2(0, 0);
    this.dimension = dimension ?? new Dimension(32, 32);
  }

  private inBounds = (mouseX: number, mouseY: number): boolean => {
    return !(
      mouseX < this.position.x ||
      mouseX > this.position.x + this.dimension.width ||
      mouseY < this.position.y ||
      mouseY > this.position.y + this.dimension.height
    );
  };

  ready() {}

  step(_delta: number, root: GameScene) {}

  public stepEntry = (delta: number, root: GameScene): void => {
    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    this.step(delta, root);
  };

  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.drawImage(ctx, drawPosX, drawPosY);
  }

  drawImage(
    ctx: CanvasRenderingContext2D,
    drawPosX: number,
    drawPosY: number
  ) {}

  destroyUIComponent() {
    this.parent.removeUIComponents(this);
  }
}
