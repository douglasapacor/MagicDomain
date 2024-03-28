import { ipcMain, IpcMainEvent } from "electron";
import { GAME_EVENTS } from "../../statics/eventlist";
import { GameFileSistem } from "./GameFileSistem";
import { GamePaths } from "./GamePaths";
import { Semaphore } from "./Semaphore";

export class GameListeners {
  private eventList: typeof GAME_EVENTS;
  private policy: {
    loadImage: Semaphore;
  };

  constructor(list: typeof GAME_EVENTS) {
    this.eventList = list;
    this.policy = {
      loadImage: new Semaphore(3),
    };
  }

  public initialize(): void {
    ipcMain.on(
      this.eventList.LOAD_PNG_IMAGE,
      (event: IpcMainEvent, ...args: { imgFileName: string }[]) => {
        this.policy.loadImage.acquire();

        event.reply(this.eventList.LOAD_PNG_IMAGE, {
          imageName: args[0].imgFileName,
          imageBuffer: GameFileSistem.readFile(
            `${GamePaths.assets}\\${args[0].imgFileName}`,
          ),
        });

        this.policy.loadImage.release();
      },
    );
  }
}

