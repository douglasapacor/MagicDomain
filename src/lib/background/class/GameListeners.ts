import { App, ipcMain, IpcMainEvent } from "electron";
import { GAME_EVENTS } from "../../../statics/eventlist";
import { GameFileSistem } from "./GameFileSistem";
import { GamePaths } from "./GamePaths";
import { Semaphore } from "./Semaphore";

export class GameListeners {
  private eventList: typeof GAME_EVENTS;
  private fileSemaphore: Semaphore;
  private soundSemaphore: Semaphore;

  constructor(list: typeof GAME_EVENTS) {
    this.eventList = list;
    this.fileSemaphore = new Semaphore(3);
    this.soundSemaphore = new Semaphore(3);
  }

  public initialize(app: App): void {
    ipcMain.on(this.eventList.REQUEST_START, (event: IpcMainEvent) =>
      event.reply(this.eventList.START_RESPONSE),
    );
    ipcMain.on(this.eventList.QUIT_APP, () => app.quit());
    ipcMain.on(
      this.eventList.REQUEST_FILE,

      (
        event: IpcMainEvent,
        args: { responseId: string; fileName: string }[],
      ) => {
        this.fileSemaphore.acquire();

        const responseId = args[0].responseId;
        const fileName = args[0].fileName;

        const buffer = Buffer.from(
          GameFileSistem.readFile(`${GamePaths.assets}${fileName}`),
        ).toString("base64");

        event.reply(responseId, {
          imageBuffer: buffer,
        });

        this.fileSemaphore.release();
      },
    );
    ipcMain.on(
      this.eventList.REQUEST_SOUND,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (event: IpcMainEvent, args: any) => {
        this.soundSemaphore.acquire();
        const responseId = args[0].responseId;
        const fileName = args[0].fileName;
        const namePath = `${GamePaths.assets}${fileName}`;

        const buffer = Buffer.from(GameFileSistem.readFile(namePath)).toString(
          "base64",
        );

        event.reply(responseId, {
          audioData: buffer,
        });

        this.soundSemaphore.release();
      },
    );
  }
}
