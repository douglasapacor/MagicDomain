import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value);
  },

  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args);
    ipcRenderer.on(channel, subscription);

    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },

  removeAll(name: string) {
    return () => {
      ipcRenderer.removeAllListeners(name);
    };
  },

  ipcRenderer: ipcRenderer,
};

contextBridge.exposeInMainWorld("ipc", handler);

export type IpcHandler = typeof handler;
