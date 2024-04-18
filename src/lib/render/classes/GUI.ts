export class GUI {
  private _name: string;
  private uiFrame: HTMLDivElement;

  constructor(name: string) {
    this.uiFrame = document.createElement("div");
    this._name = name;
    this.uiFrame.setAttribute("name", name);

    this.uiFrame.style.position = "absolute";
    this.uiFrame.style.inset = "0px";
    this.uiFrame.style.width = "100%";
    this.uiFrame.style.height = "100%";

    document.getElementById("GameContainer").appendChild(this.uiFrame);
  }

  protected show(): void {
    this.uiFrame.style.display = "block";
  }

  protected hide(): void {
    this.uiFrame.style.display = "none";
  }

  protected get content(): HTMLDivElement {
    return this.uiFrame;
  }

  protected addChildren(content: HTMLElement) {
    this.uiFrame.appendChild(content);
  }

  public get name(): string {
    return this._name;
  }

  public destroy(): void {
    this.uiFrame.remove();
  }
}
