import { app } from "electron";
import serve from "electron-serve";
import path from "path";
import { createWindow } from "./helpers";
const isProd = process.env.NODE_ENV === "production";
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

if (isProd) serve({ directory: "app" });
else app.setPath("userData", `${app.getPath("userData")} (development)`);

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./game");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/game`);
    // mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});
