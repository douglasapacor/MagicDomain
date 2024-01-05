import { GameObject } from "../classes/GameObject";

export type eventCallBacksType = {
  id: number;
  eventName: string;
  caller: GameObject;
  callback: Function;
};
