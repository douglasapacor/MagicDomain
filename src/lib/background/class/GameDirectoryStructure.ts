import path from "path";
import { GameFileSistem } from "./GameFileSistem";
import { GamePaths } from "./GamePaths";
type gameStructure = {
  name: string;
  type: "folder" | "json";
  childrens?: gameStructure[];
};

export class GameDirectoryStructure {
  private _gameStructure: gameStructure[];

  constructor(private home: string) {
    this._gameStructure = [
      {
        name: "data",
        type: "folder",
        childrens: [
          {
            name: "saves",
            type: "folder",
          },
        ],
      },
    ];
  }

  public validadeInternalStructure(): void {
    this.process(this._gameStructure, this.home);
  }

  private process(structure: gameStructure[], local: string): void {
    for (let i = 0; i < structure.length; i++) {
      const pathToVerify = path.join(local, structure[i].name);

      if (structure[i].type === "folder") {
        if (!GameFileSistem.existDirectory(pathToVerify))
          GameFileSistem.createDirectory(pathToVerify);

        GamePaths.createPath(structure[i].name, pathToVerify);
      }

      if (structure[i].type === "json")
        if (!GameFileSistem.existFile(pathToVerify + ".json"))
          GameFileSistem.createFile(pathToVerify + ".json", {});

      if (structure[i].childrens)
        this.process(structure[i].childrens, pathToVerify);
    }
  }
}
