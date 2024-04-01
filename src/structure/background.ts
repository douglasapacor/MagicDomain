declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
import { Structure } from "../lib/background/class/Structure";

new Structure(
  MAIN_WINDOW_WEBPACK_ENTRY,
  MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
  __dirname,
).initialize();
