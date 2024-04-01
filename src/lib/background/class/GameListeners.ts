import { ipcMain, IpcMainEvent } from "electron";
import { GAME_EVENTS } from "../../../statics/eventlist";
import { GameFileSistem } from "./GameFileSistem";
import { GamePaths } from "./GamePaths";
import { Semaphore } from "./Semaphore";

export class GameListeners {
  private eventList: typeof GAME_EVENTS;
  private policy: {
    loadImage: Semaphore;
    loadJSONContent: Semaphore;
  };

  constructor(list: typeof GAME_EVENTS) {
    this.eventList = list;
    this.policy = {
      loadImage: new Semaphore(3),
      loadJSONContent: new Semaphore(5),
    };
  }

  public initialize(): void {
    ipcMain.on(this.eventList.REQUEST_START, (event: IpcMainEvent) =>
      event.reply(this.eventList.START_RESPONSE),
    );

    ipcMain.on(
      this.eventList.REQUEST_PNG_IMAGE,
      (event: IpcMainEvent, ...args: { imgFileName: string }[]) => {
        this.policy.loadImage.acquire();

        const { imgFileName } = args[0];

        event.reply(this.eventList.PNG_IMAGE_RESPONSE, {
          imageName: imgFileName,
          imageBuffer: GameFileSistem.readFile(
            `${GamePaths.assets}\\images\\${imgFileName}.png`,
          ),
        });

        this.policy.loadImage.release();
      },
    );

    ipcMain.on(
      this.eventList.REQUEST_SPRITE_CONTENT,
      (event: IpcMainEvent, ...args: { spriteName: string }[]) => {
        this.policy.loadImage.acquire();

        const { spriteName } = args[0];

        event.reply(this.eventList.SPRITE_CONTENT_RESPONSE, {
          imageName: spriteName,
          imageBuffer: GameFileSistem.readFile(
            `${GamePaths.assets}\\sprites\\${spriteName}.png`,
          ),
        });

        this.policy.loadImage.release();
      },
    );

    ipcMain.on(
      this.eventList.REQUEST_JSON_CONTENT,
      (
        event: IpcMainEvent,
        ...args: { type: string; jsonFileName: string }[]
      ) => {
        this.policy.loadJSONContent.acquire();

        const { type, jsonFileName } = args[0];

        event.reply(this.eventList.JSON_CONTENT_RESPONSE, {
          jsonObject: GameFileSistem.readJSONFile(
            `${GamePaths.assets}\\data\\${type}\\${jsonFileName}.json`,
          ),
        });

        this.policy.loadJSONContent.release();
      },
    );
  }
}

