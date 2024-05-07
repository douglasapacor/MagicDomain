import { UIComponent } from "../../lib/render";

export class IconButtonLeft extends UIComponent {
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
      "M1712.51 0l-1702.54 1218.96 1702.54 1218.97 0 -2437.92zm-851.27 609.48m0 1218.96m851.27 -609.48",
    );
    this.poligon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon",
    );
    this.poligon.setAttribute("fill", "black");
    this.poligon.setAttribute(
      "points",
      "25.89,1230.35 -0,1248.88 1702.54,2467.85 1702.54,2430.78 ",
    );
    this.g.appendChild(this.path);
    this.g.appendChild(this.poligon);
    this.svg.appendChild(this.g);
    this.addChildren(this.svg);
  }
}

