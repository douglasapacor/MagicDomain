import { generateKey } from "../helpers/randoms";
import { GameObject } from "./GameObject";

export class Entity extends GameObject {
  constructor(name?: string) {
    super(name ? name + "_entity" : `${generateKey(5)}_entity`);
  }
}

