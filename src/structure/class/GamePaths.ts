export class GamePaths {
  private static readonly gamePaths: Map<string, string> = new Map();

  static createPath(name: string, path: string): void {
    this.gamePaths.set(name, path);
  }

  static getPathByName(name: string): string | undefined {
    return this.gamePaths.get(name);
  }

  static get entry(): string | undefined {
    return this.gamePaths.get("entry");
  }

  static get preload(): string | undefined {
    return this.gamePaths.get("preload");
  }

  static get src(): string | undefined {
    return this.gamePaths.get("src");
  }

  static get home(): string | undefined {
    return this.gamePaths.get("home");
  }

  static get assets(): string | undefined {
    return this.gamePaths.get("assets");
  }
}

