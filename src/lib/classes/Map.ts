import { generateKey } from "../helpers/randoms";
import { GameObject } from "./GameObject";

export class Map extends GameObject {
  public width: number;
  public height: number;

  constructor(w: number, h: number, name?: string) {
    super(name ? name + "_map" : `${generateKey(5)}_map`);
    this.width = w;
    this.height = h;
  }
}

