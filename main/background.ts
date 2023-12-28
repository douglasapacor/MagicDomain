import { app, ipcMain } from "electron";
import serve from "electron-serve";
import path from "path";
import { GameLoop } from "./Game/Classes/GameLoop";
import { createWindow } from "./helpers";

const isProd = process.env.NODE_ENV === "production";

if (isProd) serve({ directory: "app" });
else app.setPath("userData", `${app.getPath("userData")} (development)`);

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isProd) await mainWindow.loadURL("app://./gameview");
  else {
    await mainWindow.loadURL(`http://localhost:${process.argv[2]}/gameview`);
    mainWindow.webContents.openDevTools();
  }

  const gl = new GameLoop((t) => {
    console.log("aqui", t);
  });

  gl.start();
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});
