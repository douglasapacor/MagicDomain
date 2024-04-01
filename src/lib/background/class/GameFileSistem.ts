import fs from "fs";

export class GameFileSistem {
  constructor() {}

  static createFile(fileName: string, fileContent: unknown): void {
    fs.writeFileSync(fileName, JSON.stringify(fileContent));
  }

  static createDirectory(directoryName: string): void {
    fs.mkdirSync(directoryName);
  }

  static existFile(fileNameLocation: string): boolean {
    return fs.existsSync(fileNameLocation);
  }

  static readFile(fileNameLocation: string): Buffer {
    return fs.readFileSync(fileNameLocation);
  }

  static readJSONFile(fileNameLocation: string): unknown {
    return JSON.parse(fs.readFileSync(fileNameLocation, "utf-8"));
  }
}

