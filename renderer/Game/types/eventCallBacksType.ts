import { GameObject } from "../classes/core/GameObject";

export type eventCallBacksType = {
  id: number;
  eventName: string;
  caller: GameObject;
  callback: Function;
};
