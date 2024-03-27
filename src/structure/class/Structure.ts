import { app, BrowserWindow, Menu, powerSaveBlocker } from "electron";
import serve from "electron-serve";
import path from "path";
import { GAME_EVENTS } from "../../statics/eventlist";
import { GameListeners } from "./GameListeners";

export class Structure {
  private readonly isProd: boolean;
  private readonly gameListeners: GameListeners;
  private readonly entry: string;
  private readonly preload: string;
  private readonly home: string;
  private browserWindow: BrowserWindow;

  constructor(entry: string, preload: string) {
    this.isProd = process.env.NODE_ENV === "production";
    this.entry = entry;
    this.preload = preload;

    const homeString = app.getPath("userData");

    this.home = path.join(
      this.isProd ? homeString : `${homeString} (development)`,
    );

    this.gameListeners = new GameListeners(GAME_EVENTS);
  }

  public async initialize() {
    try {
      process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
      powerSaveBlocker.start("prevent-app-suspension");

      if (process.env.NODE_ENV === "production") serve({ directory: "app" });
      else app.setPath("userData", this.home);

      if (require("electron-squirrel-startup")) app.quit();

      Menu.setApplicationMenu(null);

      const createWindow = async () => {
        this.browserWindow = new BrowserWindow({
          width: 1280,
          height: 720,
          webPreferences: {
            preload: this.preload,
            nodeIntegration: true,
          },
        });

        this.browserWindow.loadURL(this.entry);

        if (!this.isProd) this.browserWindow.webContents.openDevTools();
      };

      const windowsAllClosed = async () => {
        if (process.platform !== "darwin") app.quit();
      };

      const activate = async () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
      };

      const registerIpcEvents = async () => {
        this.gameListeners.initialize();
      };

      app
        .on("ready", createWindow)
        .on("window-all-closed", windowsAllClosed)
        .on("activate", activate)
        .whenReady()
        .then(registerIpcEvents);
    } catch (error) {
      console.log("ERRORORORORORO", error);
    }
  }
}

