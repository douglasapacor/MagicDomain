import { momentRegister } from "./types/momentRegister";

export class GameLog {
  public startedAt: Date;
  public elapsedTime: momentRegister;

  constructor() {
    this.startedAt = new Date();
    this.elapsedTime = {
      days: 0,
      hour: 0,
      minute: 0,
      seconds: 0,
      miliseconds: 0,
    };
  }
}
