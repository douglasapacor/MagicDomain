declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
import { Structure } from "./class/Structure";

const structure = new Structure(
  MAIN_WINDOW_WEBPACK_ENTRY,
  MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
);

structure.initialize();
