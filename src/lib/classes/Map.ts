import { Dimensions } from "./Dimensions";
import { GameObject } from "./GameObject";

export class Map extends GameObject {
  public dimensions: Dimensions;

  constructor(name: string) {
    super(`${name}_map`);
  }
}
