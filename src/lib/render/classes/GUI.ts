/* eslint-disable @typescript-eslint/no-unused-vars */
export class GUI {
  private _name: string;
  private _frame: HTMLDivElement;
  private _width: number;
  private _height: number;

  constructor(name: string) {
    this._frame = document.createElement("div");
    this._name = name;

    this._frame.setAttribute("id", name);

    this._frame.style.position = "absolute";
    this._frame.style.inset = "0px";
    this._frame.style.width = "100%";
    this._frame.style.height = "100%";
    this._frame.style.minHeight = "768px";
    this._frame.style.minWidth = "1024px";

    this._width = +getComputedStyle(this._frame).width;
    this._height = +getComputedStyle(this._frame).height;

    document.getElementById("GameContainer").appendChild(this._frame);
  }

  protected show(): void {
    this._frame.style.display = "block";
  }

  protected hide(): void {
    this._frame.style.display = "none";
  }

  protected get frame(): HTMLDivElement {
    return this._frame;
  }

  protected addChildren(content: HTMLElement) {
    this._frame.appendChild(content);
  }

  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }

  public get name(): string {
    return this._name;
  }

  public destroy(): void {
    this._frame.remove();
  }

  public Step(delta?: number): void {}
}
