import { Map as GameMap } from "./Map";
export class MapFactory {
  private readonly registry: Map<string, typeof GameMap> = new Map();

  constructor() {}

  public register(name: string, classMap: typeof GameMap): void {
    this.registry.set(name, classMap);
  }

  public create(name: string): GameMap {
    const classMap = this.registry.get(name);
    return new classMap(name);
  }
}

