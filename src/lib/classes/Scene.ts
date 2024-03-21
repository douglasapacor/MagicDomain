import { GameObject } from "./GameObject";

export class Scene extends GameObject {
  constructor(name: string) {
    super(`${name}_scene`);
  }
}
