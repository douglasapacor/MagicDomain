declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
import { BrowserWindow } from "electron";
import { Structure } from "./class/Structure";

let browserWindow: BrowserWindow;

new Structure(
  MAIN_WINDOW_WEBPACK_ENTRY,
  MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
  browserWindow,
).initialize();
