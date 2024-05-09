import fs from "fs";

export class GameFileSistem {
  constructor() {}

  static createFile(fileName: string, fileContent: unknown): void {
    fs.writeFileSync(fileName, JSON.stringify(fileContent), "utf-8");
  }

  static readFile(fileNameLocation: string): Buffer {
    return fs.readFileSync(fileNameLocation);
  }

  static createDirectory(directoryName: string): void {
    fs.mkdirSync(directoryName);
  }

  static async asyncCreateDirectory(directoryName: string): Promise<void> {
    await fs.promises.mkdir(directoryName);
  }

  static existFile(fileNameLocation: string): boolean {
    return fs.existsSync(fileNameLocation);
  }

  static existDirectory(directoryLocation: string): boolean {
    return fs.existsSync(directoryLocation);
  }

  static readJSONFile(fileNameLocation: string): unknown {
    return JSON.parse(fs.readFileSync(fileNameLocation, "utf-8"));
  }
}

