import { ipcMain, IpcMainEvent } from "electron";
import { GAME_EVENTS } from "../../../statics/eventlist";
import { GameFileSistem } from "./GameFileSistem";
import { GamePaths } from "./GamePaths";
import { Semaphore } from "./Semaphore";

export class GameListeners {
  private eventList: typeof GAME_EVENTS;
  private fileSemaphore: Semaphore;

  constructor(list: typeof GAME_EVENTS) {
    this.eventList = list;
    this.fileSemaphore = new Semaphore(3);
  }

  public initialize(): void {
    ipcMain.on(this.eventList.REQUEST_START, (event: IpcMainEvent) =>
      event.reply(this.eventList.START_RESPONSE),
    );

    ipcMain.on(
      this.eventList.REQUEST_FILE,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (event: IpcMainEvent, args: any) => {
        this.fileSemaphore.acquire();

        const responseId = args[0].responseId;
        const fileName = args[0].fileName;
        const namePath = `${GamePaths.assets}${fileName}`;

        const buffer = Buffer.from(GameFileSistem.readFile(namePath)).toString(
          "base64",
        );

        event.reply(responseId, {
          imageBuffer: buffer,
        });

        this.fileSemaphore.release();
      },
    );
  }
}

