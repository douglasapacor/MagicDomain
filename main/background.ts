import { Menu, app } from "electron";
import serve from "electron-serve";
import path from "path";
import { GameMain } from "./Components";
import { createWindow } from "./helpers";
const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  Menu.setApplicationMenu(null);

  if (isProd) await mainWindow.loadURL("app://./GameScene");
  else {
    await mainWindow.loadURL(`http://localhost:${process.argv[2]}/GameScene`);
    mainWindow.webContents.openDevTools();
  }

  new GameMain(mainWindow);
})();

app.on("window-all-closed", () => {
  app.quit();
});
