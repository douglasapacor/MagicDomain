import { IEventCallback } from "./IEventCallback";

export interface IAddEventListener {
  name: string;
  event: string;
  listener: IEventCallback;
}

