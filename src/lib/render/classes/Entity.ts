import { GameObject } from "./GameObject";

export class Entity extends GameObject {
  constructor(name: string) {
    super(`${name}_entity`);
  }
}
