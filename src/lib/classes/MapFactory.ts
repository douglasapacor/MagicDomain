import { Map as GameMap } from "./Map";
export class MapFactory {
  private static readonly registry: Map<string, typeof GameMap>;

  private constructor() {}

  public static register(name: string, classMap: typeof GameMap): void {
    this.registry.set(name, classMap);
  }

  public static create(name: string): GameMap {
    const classMap = this.registry.get(name);
    return new classMap(name);
  }
}

