// import { Map as GameMap, Vector2 } from "..";

import { Map as GameMap } from "./Map";
import { Vector2 } from "./Vector2";

export class MapProvider {
  private isLoaded: boolean;
  private currentyMap: GameMap | null;
  private readonly maps: Map<string, typeof GameMap>;

  constructor() {
    this.isLoaded = false;
    this.currentyMap = null;
    this.maps = new Map<string, typeof GameMap>();
  }

  public registerGameMap(gameMapName: string, gameMap: typeof GameMap): void {
    this.maps.set(gameMapName, gameMap);
  }

  public createAndLoadMap(gameMapName: string): void {
    const mapClass = this.maps.get(gameMapName);

    this.currentyMap = new mapClass(100, 100, gameMapName);
    this.isLoaded = true;
  }

  public unloadCurrentMap(): void {
    this.currentyMap = null;
    this.isLoaded = false;
  }

  public deleteMap(gameMapName: string): void {
    if (this.currentyMap.name === gameMapName) {
      this.currentyMap = null;
      this.isLoaded = false;
    }

    this.maps.delete(gameMapName);
  }

  public get getMap(): GameMap | null {
    return this.currentyMap;
  }

  public get getDimensions(): Vector2 {
    return new Vector2(this.currentyMap.width, this.currentyMap.height);
  }

  public get mapIsLoaded(): boolean {
    return this.isLoaded;
  }
}
