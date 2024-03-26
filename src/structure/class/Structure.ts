import { app, BrowserWindow, Menu, powerSaveBlocker } from "electron";
import serve from "electron-serve";
import { GameFileSistem } from "./GameFileSistem";
import { GamePaths } from "./GamePaths";
import { IManifest } from "./Interfaces/IManifest";

export class Structure {
  private readonly isProd: boolean;
  private browserWindow: BrowserWindow;

  constructor(entry: string, preload: string, bw: BrowserWindow) {
    this.isProd = process.env.NODE_ENV === "production";

    GamePaths.registerPaths(this.isProd, entry, preload);
  }

  private async createDirectories() {
    if (!(await GameFileSistem.existFile(GamePaths.artifact)))
      await GameFileSistem.createDirectory(GamePaths.artifact);

    if (!(await GameFileSistem.existFile(GamePaths.logs)))
      await GameFileSistem.createDirectory(GamePaths.logs);

    if (!(await GameFileSistem.existFile(GamePaths.maps)))
      await GameFileSistem.createDirectory(GamePaths.maps);

    if (!(await GameFileSistem.existFile(GamePaths.language)))
      await GameFileSistem.createDirectory(GamePaths.language);

    if (!(await GameFileSistem.existFile(GamePaths.assets)))
      await GameFileSistem.createDirectory(GamePaths.assets);
  }

  private async createManifest() {
    if (!(await GameFileSistem.existFile(GamePaths.manisfest))) {
      const newManifest: IManifest = {
        version: app.getVersion(),
        paths: GamePaths.getManifestContent,
      };
      await GameFileSistem.createFile(GamePaths.manisfest, newManifest);
    }
  }

  public async initialize() {
    try {
      process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

      powerSaveBlocker.start("prevent-app-suspension");

      if (process.env.NODE_ENV === "production") serve({ directory: "app" });
      else app.setPath("userData", GamePaths.home);

      await this.createDirectories();
      await this.createManifest();

      if (require("electron-squirrel-startup")) app.quit();

      const createWindow = (): void => {
        this.browserWindow = new BrowserWindow({
          width: 1280,
          height: 720,
          webPreferences: {
            preload: GamePaths.preload,
            nodeIntegration: true,
          },
        });
        this.browserWindow.loadURL(GamePaths.webpack);

        if (!this.isProd) this.browserWindow.webContents.openDevTools();
      };

      Menu.setApplicationMenu(null);

      app.on("ready", createWindow);
      app.on("window-all-closed", () => {
        if (process.platform !== "darwin") app.quit();
      });
      app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
      });
    } catch (error) {
      console.log("ERRORORORORORO", error);
    }
  }
}

