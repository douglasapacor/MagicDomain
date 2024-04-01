import { IEventCallback } from "./IEventCallback";

export interface IEventRegistration {
  id: number;
  eventName: string;
  caller: unknown;
  callback: IEventCallback;
}
