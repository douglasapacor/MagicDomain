import { IpcRendererEvent } from "electron";
import { GAME_EVENTS } from "../../../statics/eventlist";

export class ResourcesProvider {
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
      GAME_EVENTS.RESPONSE_FILE,
      (
        _: IpcRendererEvent,
        ...args: { imageName: string; imageBuffer: string }[]
      ) => {
        const { imageName, imageBuffer } = args[0];

        const img = new Image();

        img.src = `data:image/png;base64,${imageBuffer}`;

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

  // public loadResourceByName(resource: Resource): void {
  //   window.bridge.send(GAME_EVENTS.REQUEST_FILE, {
  //     fileName: resource.fullName,
  //   });
  // }

  public unloadResourceByName(name: string): void {
    delete this.images[name];
  }

  // public loadResourceList(resource: Resource[]): void {
  //   for (let i = 0; i < resource.length; i++) {
  //     window.bridge.send(GAME_EVENTS.REQUEST_FILE, {
  //       fileName: resource[i].fullName,
  //     });
  //   }
  // }

  public unloadResourceList(name: string[]): void {
    for (let i = 0; i < name.length; i++) delete this.images[name[i]];
  }
}
