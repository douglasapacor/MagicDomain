import { GameDirectory } from "./GameDirectory";
import { GameFile } from "./GameFile";

export class GameDirectorySystem {
  private gameDir: { [key: string]: GameDirectory | GameFile };

  constructor(private home: string) {
    const dataDir = new GameDirectory("data", this.home);
    const savesDir = new GameDirectory("saves", dataDir.fullName);
    const datafile = new GameFile("datafile", savesDir.fullName);

    savesDir.addChildren(datafile);
    dataDir.addChildren(datafile);

    this.gameDir = {
      data: dataDir,
    };
  }
}

