import { GamePaths } from "./GamePaths";

export class GameDirectorySystem {
  private homeDir = GamePaths.home;

  private gameDirStructure: ["data", ""];
  private gameFileStructure: [];

  private dirGameStructure: any = {};

  constructor() {
    this.dirGameStructure = {};
  }
}

