export class HtmlBuilder {
  public createDiv = (id?: string): HTMLDivElement => {
    const d = document.createElement("div");
    d.id = id ? id : "";
    return d;
  };

  public createCanvas = (id?: string): HTMLCanvasElement => {
    const c = document.createElement("canvas");
    c.id = id ? id : "";
    return c;
  };
}
