import { generateKey } from "../helpers/randoms";
import { GameObject } from "./GameObject";

export class Scene extends GameObject {
  constructor(name?: string) {
    super(name ? name + "_scene" : `${generateKey(5)}_scene`);
  }
}
