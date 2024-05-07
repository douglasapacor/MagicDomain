import { UIComponent } from "../../lib/render";

export class IconButtonRigth extends UIComponent {
  private svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  private path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  private poligon: SVGPathElement;
  private g = document.createElementNS("http://www.w3.org/2000/svg", "g");

  constructor(id: string) {
    super({ id, tag: "div" });

    this.setClass = "icon-button";

    this.svg.setAttribute("xml:space", "preserve");
    this.svg.setAttribute("width", "10mm");
    this.svg.setAttribute("height", "17mm");
    this.svg.setAttribute(
      "style",
      "shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd",
    );
    this.svg.setAttribute("viewBox", "0 0 1712.51 2467.85");
    this.path.setAttribute("fill", "white");
    this.path.setAttribute(
      "d",
      "M-0 0l1702.54 1218.96 -1702.54 1218.97 0 -2437.92zm851.27 609.48m0 1218.96m-851.27 -609.48",
    );
    this.poligon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon",
    );
    this.poligon.setAttribute("fill", "black");
    this.poligon.setAttribute(
      "points",
      "1686.62,1230.35 1712.51,1248.88 9.98,2467.85 9.98,2430.78 ",
    );
    this.g.appendChild(this.path);
    this.g.appendChild(this.poligon);
    this.svg.appendChild(this.g);
    this.addChildren(this.svg);
  }
}

