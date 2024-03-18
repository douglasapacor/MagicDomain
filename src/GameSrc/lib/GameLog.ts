export class GameLog {
  public startedAt: Date;
  public elapsedTime: {
    days: number;
    hour: number;
    minute: number;
    seconds: number;
    miliseconds: number;
  };

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
