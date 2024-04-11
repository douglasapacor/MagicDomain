import { IpcRendererEvent } from "electron";
import { GAME_EVENTS } from "../../../statics/eventlist";
import { generateKey } from "../helpers/randoms";

export class Resource {
  private readonly _name: string;
  private readonly _type: "images" | "maps" | "sprite";
  private readonly _ext: "png" | "jpg" | "jpeg" | "json";
  private _image: HTMLImageElement;
  private _isLoaded: boolean;
  private readonly _event_response_Id: string = `${GAME_EVENTS.RESPONSE_FILE}_${generateKey(5)}`;

  constructor(
    name: string,
    type: "images" | "maps" | "sprite",
    ext?: "png" | "jpg" | "jpeg" | "json",
  ) {
    this._name = name;
    this._type = type;
    this._ext = ext ? ext : "png";
    this._isLoaded = false;

    window.bridge.on(
      this._event_response_Id,
      (_: IpcRendererEvent, ...args: { imageBuffer: string }[]) => {
        const { imageBuffer } = args[0];
        const img = new Image();

        img.src = `data:image/png;base64,${imageBuffer}`;
        this._image = img;
        this._isLoaded = false;

        this._image.onload = () => {
          this._isLoaded = true;
        };
      },
    );
  }

  public load = () => {
    window.bridge.send(GAME_EVENTS.REQUEST_FILE, {
      fileName: `\\${this._type}\\${this._name}.${this._ext}`,
      responseId: this._event_response_Id,
    });
  };

  public get name(): string {
    return this._name;
  }

  public get image(): HTMLImageElement {
    return this._image;
  }

  public get isLoaded(): boolean {
    return this._isLoaded;
  }
}

