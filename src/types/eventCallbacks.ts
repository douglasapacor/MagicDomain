/* eslint-disable @typescript-eslint/no-explicit-any */
import { GameObject } from "../classes/GameObject";

export type eventCallbacks = {
  id: number;
  eventName: string;
  caller: GameObject;
  callback: (value: any) => void;
};
