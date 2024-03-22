import fs from "fs";
export class GameFileSistem {
  constructor() {}

  static async createFile(
    fileName: string,
    fileContent: unknown,
  ): Promise<void> {
    await fs.promises.writeFile(fileName, JSON.stringify(fileContent));
  }

  static async createDirectory(directoryName: string): Promise<void> {
    await fs.promises.mkdir(directoryName);
  }

  static async existFile(fileNameLocation: string): Promise<boolean> {
    return fs.existsSync(fileNameLocation);
  }
}

