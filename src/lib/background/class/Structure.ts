import { app, BrowserWindow, Menu, powerSaveBlocker } from "electron";
import serve from "electron-serve";
import path from "path";
import { GAME_EVENTS } from "../../../statics/eventlist";
import { GameDirectoryStructure } from "./GameDirectoryStructure";
import { GameListeners } from "./GameListeners";
import { GamePaths } from "./GamePaths";

export class Structure {
  private readonly isProd: boolean;
  private readonly gameListeners: GameListeners;
  protected browserWindow: BrowserWindow;
  private gameDirectoryStructure: GameDirectoryStructure;

  constructor(entry: string, preload: string, src: string) {
    const homeString = app.getPath("userData");

    this.isProd = process.env.NODE_ENV === "production";

    const srcPath = path.join(src, "../", "../", "src");

    GamePaths.createPath("entry", entry);
    GamePaths.createPath("preload", preload);
    GamePaths.createPath("src", srcPath);
    GamePaths.createPath("assets", path.join(srcPath, "assets"));
    GamePaths.createPath(
      "home",
      path.join(this.isProd ? homeString : `${homeString} (development)`),
    );

    this.gameDirectoryStructure = new GameDirectoryStructure(
      GamePaths.getPathByName("home"),
    );

    this.gameDirectoryStructure.validadeInternalStructure();

    this.gameListeners = new GameListeners(GAME_EVENTS);
  }

  public async initialize() {
    try {
      process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
      powerSaveBlocker.start("prevent-app-suspension");

      if (process.env.NODE_ENV === "production") serve({ directory: "app" });
      else app.setPath("userData", GamePaths.home);

      if (require("electron-squirrel-startup")) app.quit();

      Menu.setApplicationMenu(null);

      const createWindow = async () => {
        this.browserWindow = new BrowserWindow({
          width: 1280,
          height: 720,
          webPreferences: {
            preload: GamePaths.preload,
            nodeIntegration: true,
          },
        });

        this.browserWindow.loadURL(GamePaths.entry);

        if (!this.isProd) this.browserWindow.webContents.openDevTools();
      };

      const windowsAllClosed = async () => {
        if (process.platform !== "darwin") app.quit();
      };

      const activate = async () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
      };

      const registerIpcEvents = async () => {
        this.gameListeners.initialize(app);
      };

      app
        .on("ready", createWindow)
        .on("window-all-closed", windowsAllClosed)
        .on("activate", activate)
        .whenReady()
        .then(registerIpcEvents);
    } catch (error) {
      console.error(`BackgroundError: ${error}`);
    }
  }
}

