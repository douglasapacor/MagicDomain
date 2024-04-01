import { IpcRendererEvent } from "electron";
import { GAME_EVENTS } from "../../../statics/eventlist";

export class Resources {
  public images: Record<
    string,
    {
      image: HTMLImageElement;
      isLoaded: boolean;
    }
  >;

  constructor() {
    this.images = {};

    window.bridge.on(
      GAME_EVENTS.PNG_IMAGE_RESPONSE,
      (
        _: IpcRendererEvent,
        ...args: { imageName: string; imageBuffer: Buffer }[]
      ) => {
        const { imageName, imageBuffer } = args[0];

        const img = new Image();

        img.src = `data:image/png;base64,${imageBuffer.toString("base64")}`;

        this.images[imageName] = {
          image: img,
          isLoaded: false,
        };

        this.images[imageName].image.onload = () => {
          this.images[imageName].isLoaded = true;
        };
      },
    );
  }

  public loadResourceByName(name: string): void {
    window.bridge.send(GAME_EVENTS.REQUEST_PNG_IMAGE, { imgFileName: name });
  }

  public unloadResourceByName(name: string): void {
    delete this.images[name];
  }

  public loadResourceList(name: string[]): void {
    for (let i = 0; i < name.length; i++) {
      window.bridge.send(GAME_EVENTS.REQUEST_PNG_IMAGE, { imgFileName: name });
    }
  }

  public unloadResourceList(name: string[]): void {
    for (let i = 0; i < name.length; i++) delete this.images[name[i]];
  }
}
