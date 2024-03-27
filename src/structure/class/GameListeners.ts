import { ipcMain, IpcMainEvent } from "electron";
import fs from "fs";
import { GAME_EVENTS } from "../../statics/eventlist";
import { Semaphore } from "./Semaphore";

export class GameListeners {
  private eventList: typeof GAME_EVENTS;
  private policy: { loadImage: Semaphore };

  constructor(list: typeof GAME_EVENTS) {
    this.eventList = list;
    this.policy = {
      loadImage: new Semaphore(3),
    };
  }

  public initialize(): void {
    ipcMain.on(
      this.eventList.LOAD_IMAGE,
      (event: IpcMainEvent, ...args: { data: string }[]) => {
        this.policy.loadImage.acquire();
        event.reply(this.eventList.LOAD_IMAGE, fs.readFileSync(args[0].data));
        this.policy.loadImage.release();
      },
    );
  }
}

