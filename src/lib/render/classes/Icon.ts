export class Icon {
  private _id: string;
  private _svg: SVGSVGElement = document.createElementNS<"svg">(
    "http://www.w3.org/2000/svg",
    "svg",
  );
  private _path: SVGPathElement = document.createElementNS<"path">(
    "http://www.w3.org/2000/svg",
    "path",
  );
  private _poligon: SVGPolygonElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon",
  );
  private _g: SVGGElement = document.createElementNS<"g">(
    "http://www.w3.org/2000/svg",
    "g",
  );

  constructor(id: string) {
    this._id = id;
  }

  public get id(): string {
    return this._id;
  }

  public get svg(): SVGSVGElement {
    return this._svg;
  }

  public get path(): SVGPathElement {
    return this._path;
  }

  public get poligon(): SVGPolygonElement {
    return this._poligon;
  }

  public get g(): SVGGElement {
    return this._g;
  }
}

