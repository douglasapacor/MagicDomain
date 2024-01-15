import { GameObject } from "../classes";

export type eventCallBacksType = {
  id: number;
  eventName: string;
  caller: GameObject;
  callback: Function;
};
