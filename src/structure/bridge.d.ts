import { IpcHandler } from "./preload";

declare global {
  interface Window {
    bridge: IpcHandler;
  }
}

