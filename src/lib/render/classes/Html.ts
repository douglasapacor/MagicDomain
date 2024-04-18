export class Html {
  private readonly _container: HTMLDivElement;
  private readonly _canvas: HTMLCanvasElement;
  private readonly _context: CanvasRenderingContext2D;
  private readonly _overlay: HTMLDivElement;

  constructor() {
    this._container = document.createElement("div");
    this._container.id = "GameContainer";
    this._container.style.position = "absolute";
    this._container.style.inset = "0px";
    this._container.style.width = "100%";
    this._container.style.height = "100%";

    this._canvas = document.createElement("canvas");
    this._canvas.id = "GameCanva";
    this._canvas.width = 1280;
    this._canvas.height = 768;
    this._canvas.style.position = "absolute";
    this._canvas.style.inset = "0px";
    this._canvas.style.width = "100%";
    this._canvas.style.height = "100%";

    this._context = this._canvas.getContext("2d");

    this._overlay = document.createElement("div");
    this._overlay.id = "GameOverlay";
    this._overlay.style.position = "absolute";
    this._overlay.style.inset = "0px";
    this._overlay.style.width = "100%";
    this._overlay.style.height = "100%";
    this._overlay.style.backgroundColor = "black";
    this._overlay.style.opacity = "1";
    this._overlay.style.zIndex = "9999";

    this._container.appendChild(this._canvas);
    this._container.appendChild(this._overlay);

    document.body.appendChild(this._container);
  }

  public get context(): CanvasRenderingContext2D {
    return this._context;
  }

  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  public get overlay(): HTMLElement {
    return this._overlay;
  }
}
