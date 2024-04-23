import { IpcRendererEvent } from "electron";
import { GAME_EVENTS } from "../../../statics/eventlist";
import { generateKey } from "../helpers/randoms";

export class Resource {
  private readonly _name: string;
  private readonly _type: "images" | "maps" | "sprite";
  private readonly _ext: "gif" | "png" | "jpg" | "jpeg" | "json";
  private _image: HTMLImageElement = new Image();
  private _isLoaded: boolean;
  private readonly _event_response_Id: string = `${GAME_EVENTS.RESPONSE_FILE}_${generateKey(5)}`;

  constructor(
    name: string,
    type: "images" | "maps" | "sprite",
    ext?: "gif" | "png" | "jpg" | "jpeg" | "json",
  ) {
    this._name = name;
    this._type = type;
    this._ext = ext ? ext : "png";
    this._isLoaded = false;

    window.bridge.on(
      this._event_response_Id,
      (_: IpcRendererEvent, ...args: { imageBuffer: string }[]) => {
        this._image.src = `data:image/${this.ext};base64,${args[0].imageBuffer}`;
        this._isLoaded = false;
      },
    );
  }

  public get name(): string {
    return this._name;
  }

  public get image(): HTMLImageElement {
    return this._image;
  }

  public get isLoaded(): boolean {
    return this._isLoaded;
  }

  public set isLoaded(isLoaded: boolean) {
    this._isLoaded = isLoaded;
  }

  public get type(): string {
    return this._type;
  }

  public get ext(): string {
    return this._ext;
  }

  public get eventResponseId(): string {
    return this._event_response_Id;
  }
}

