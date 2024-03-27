import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

export const bridge = {
  send(channel: string, ...args: unknown[]) {
    ipcRenderer.send(channel, args);
  },
  on(
    channel: string,
    callback: (event: IpcRendererEvent, ...args: unknown[]) => void,
  ) {
    ipcRenderer.on(channel, (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(_event, ...args),
    );
  },
};

contextBridge.exposeInMainWorld("bridge", bridge);

export type IpcHandler = typeof bridge;
