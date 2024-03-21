import { app, BrowserWindow, Menu } from "electron";
import serve from "electron-serve";
import fs from "fs";
import path from "path";
const userDataPath = app.getPath("userData");
const isProd = process.env.NODE_ENV === "production";
const userDataArtifactsLogs = path.join(
  isProd ? userDataPath : userDataPath + " (development)",
  "logs",
);
const userDataArtifactsPath = path.join(
  isProd ? userDataPath : userDataPath + " (development)",
  "artifacts",
);
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (isProd) {
  serve({ directory: "app" });
} else app.setPath("userData", `${userDataPath} (development)`);

if (!fs.existsSync(userDataArtifactsPath)) fs.mkdirSync(userDataArtifactsPath);

app.setAppLogsPath(userDataArtifactsLogs);

if (require("electron-squirrel-startup")) app.quit();

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
};

Menu.setApplicationMenu(null);
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
