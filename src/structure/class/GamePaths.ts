import { app } from "electron";
import path from "path";
import { IManifestContent } from "./Interfaces/IManifestContent";

export class GamePaths {
  private static readonly paths: Map<string, string> = new Map();

  private constructor() {}

  public static registerPaths(
    mode: boolean,
    webpack: string,
    preload: string,
  ): void {
    this.paths.set("webpack", webpack);
    this.paths.set("preload", preload);

    const home = app.getPath("userData");
    const finalHome = path.join(mode ? home : `${home} (development)`);

    this.paths.set("home", finalHome);

    const artifact = path.join(finalHome, "artifacts");

    this.paths.set("artifact", artifact);
    this.paths.set("logs", path.join(artifact, "logs"));
    this.paths.set("maps", path.join(artifact, "maps"));
    this.paths.set("languages", path.join(artifact, "languages"));
    this.paths.set("assets", path.join(artifact, "assets"));
    this.paths.set("manifest", path.join(artifact, "manifest.json"));
  }

  public static get webpack(): string {
    return this.paths.get("webpack");
  }

  public static get preload(): string {
    return this.paths.get("preload");
  }

  public static get home(): string {
    return this.paths.get("home");
  }

  public static get artifact(): string {
    return this.paths.get("artifact");
  }

  public static get logs(): string {
    return this.paths.get("logs");
  }

  public static get maps(): string {
    return this.paths.get("maps");
  }

  public static get language(): string {
    return this.paths.get("languages");
  }

  public static get manisfest(): string {
    return this.paths.get("manifest");
  }

  public static get assets(): string {
    return this.paths.get("assets");
  }

  public static get getManifestContent(): IManifestContent {
    return {
      home: this.paths.get("home"),
      artifacts: this.paths.get("artifact"),
      logs: this.paths.get("logs"),
      maps: this.paths.get("maps"),
      language: this.paths.get("languages"),
      assets: this.paths.get("assets"),
      manifest: this.paths.get("manifest"),
    };
  }
}

