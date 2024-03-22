import { IpcMain, IpcMainEvent } from "electron";
import { GAME_EVENTS } from "../../statics/eventlist";
import { IIpcMessage } from "./Interfaces/IIpcMessage";

export class Ipc {
  private ipcMain: IpcMain;

  constructor(
    ipcMain: IpcMain,
    private gameEvents: typeof GAME_EVENTS,
  ) {
    this.ipcMain = ipcMain;
  }

  initialize(): void {
    this.ipcMain.on(this.gameEvents.LOAD_MAP_MANIFEST, this.loadMapManifest);
  }

  private loadMapManifest(event: IpcMainEvent, message: IIpcMessage): void {
    event.sender.send(this.gameEvents.LOAD_MAP_MANIFEST, {
      algo: message.data,
    });
  }
}

