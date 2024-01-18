export class Html {
  public canva: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;

  constructor() {
    this.canva = document.createElement("canvas");

    this.canva.width = 1280;
    this.canva.height = 720;

    const container = document.createElement("div");

    container.id = "GameContainer";
    container.appendChild(this.canva);

    document.body.appendChild(container);

    this.context = this.canva.getContext("2d");
  }
}
