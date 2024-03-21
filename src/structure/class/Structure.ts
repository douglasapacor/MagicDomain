import { app, BrowserWindow, ipcMain, Menu, powerSaveBlocker } from "electron";
import serve from "electron-serve";
import fs from "fs";
import path from "path";
import { MAIN_EVENTS } from "../../statics/eventlist";
import { IManifest } from "./Interfaces/IManifest";

export class Structure {
  private readonly MAIN_WINDOW_WEBPACK_ENTRY: string;
  private readonly MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
  private readonly userDataPath: string;
  private readonly userDataArtifactsPath: string;
  private readonly userDataArtifactsLogs: string;
  private readonly userDataArtifactMap: string;
  private readonly userDataArtifactLanguages: string;
  private readonly manifestPath: string;
  private readonly isProd: boolean;

  constructor(entry: string, preload: string) {
    const userData = app.getPath("userData");

    this.MAIN_WINDOW_WEBPACK_ENTRY = entry;
    this.MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY = preload;

    this.isProd = process.env.NODE_ENV === "production";
    this.userDataPath = path.join(
      this.isProd ? userData : `${userData} (development)`,
    );
    this.userDataArtifactsPath = path.join(this.userDataPath, "artifacts");
    this.userDataArtifactsLogs = path.join(this.userDataArtifactsPath, "logs");
    this.userDataArtifactMap = path.join(this.userDataArtifactsPath, "maps");
    this.userDataArtifactLanguages = path.join(
      this.userDataArtifactsPath,
      "languages",
    );
    this.manifestPath = path.join(this.userDataArtifactsPath, "manifest.json");
  }

  private async createDirectories() {
    if (!fs.existsSync(this.userDataArtifactsPath))
      await fs.promises.mkdir(this.userDataArtifactsPath);

    if (!fs.existsSync(this.userDataArtifactsLogs))
      await fs.promises.mkdir(this.userDataArtifactsLogs);

    if (!fs.existsSync(this.userDataArtifactMap))
      await fs.promises.mkdir(this.userDataArtifactMap);

    if (!fs.existsSync(this.userDataArtifactLanguages))
      await fs.promises.mkdir(this.userDataArtifactLanguages);
  }

  private async createManifest() {
    if (!fs.existsSync(this.manifestPath)) {
      const newManifest: IManifest = {
        version: app.getVersion(),
        paths: {
          root: this.userDataPath,
          artifacts: this.userDataArtifactsPath,
          logs: this.userDataArtifactsLogs,
          maps: this.userDataArtifactMap,
          language: this.userDataArtifactLanguages,
          manifest: this.manifestPath,
        },
      };

      await fs.writeFileSync(this.manifestPath, JSON.stringify(newManifest));
    }
  }

  public async initialize() {
    process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
    powerSaveBlocker.start("prevent-app-suspension");

    if (process.env.NODE_ENV === "production") {
      serve({ directory: "app" });
    } else {
      app.setPath("userData", this.userDataPath);
    }

    await this.createDirectories();
    await this.createManifest();

    if (require("electron-squirrel-startup")) app.quit();

    const createWindow = (): void => {
      const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
          preload: this.MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
          nodeIntegration: true,
        },
      });

      mainWindow.loadURL(this.MAIN_WINDOW_WEBPACK_ENTRY);
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

    ipcMain.on(MAIN_EVENTS.LOAD_MAP_MANIFEST, () => {
      // Implement logic to handle LOAD_MAP_MANIFEST event
    });
  }
}

