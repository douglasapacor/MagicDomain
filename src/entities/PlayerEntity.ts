import { Entity } from "../lib/classes/Entity";

const ENTITY_NAME = "player";

export class PlayerEntity extends Entity {
  constructor() {
    super(ENTITY_NAME);
  }
}
