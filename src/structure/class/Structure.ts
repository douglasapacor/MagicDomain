import { app, BrowserWindow, ipcMain, Menu, powerSaveBlocker } from "electron";
import serve from "electron-serve";
import { GAME_EVENTS } from "../../statics/eventlist";
import { GameFileSistem } from "./GameFileSistem";
import { GamePaths } from "./GamePaths";
import { IManifest } from "./Interfaces/IManifest";
import { Ipc } from "./Ipc";

export class Structure {
  private readonly isProd: boolean;
  private readonly lpc: Ipc;

  constructor(entry: string, preload: string) {
    this.isProd = process.env.NODE_ENV === "production";
    GamePaths.registerPaths(this.isProd, entry, preload);

    this.lpc = new Ipc(ipcMain, GAME_EVENTS);
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
        const mainWindow = new BrowserWindow({
          width: 1280,
          height: 720,
          webPreferences: {
            preload: GamePaths.preload,
            nodeIntegration: true,
          },
        });

        mainWindow.loadURL(GamePaths.webpack);
        if (!this.isProd) mainWindow.webContents.openDevTools();
      };

      Menu.setApplicationMenu(null);

      app.on("ready", createWindow);
      app.on("window-all-closed", () => {
        if (process.platform !== "darwin") app.quit();
      });
      app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
      });

      this.lpc.initialize();
    } catch (error) {
      console.log("ERRORORORORORO", error);
    }
  }
}

