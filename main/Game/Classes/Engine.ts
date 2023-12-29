import { engineSettings } from "../types/Engine";
import { GameProcess } from "./GameProcess";

/**
 * Engine Class
 * @fileoverview Class responsible for content game functions.
 * @author Douglas Pacor
 * @version 1.0.0
 */
export class Engine {
  private engineSettings: engineSettings;
  private gameProcess: GameProcess;

  /**
   * Creates a new engine instance
   */
  public constructor() {
    this.engineSettings.lastFrameTime = 0;
    this.engineSettings.accumulatedTime = 0;
    this.engineSettings.framesCount = 60;
    this.engineSettings.frameRating = 1000 / this.engineSettings.framesCount;
    this.engineSettings.rafId = null;
    this.engineSettings.isRunning = false;

    this.gameProcess = new GameProcess();
    this.Start();
  }

  /**
   * Main Game loop
   */
  private Loop = () => {
    if (!this.engineSettings.isRunning) return;

    const now = Date.now();
    const deltaTime = now - this.engineSettings.lastFrameTime;

    this.engineSettings.lastFrameTime = now;
    this.engineSettings.accumulatedTime += deltaTime;

    const startTimeUpdate = Date.now();

    this.gameProcess.Update(deltaTime);
    this.engineSettings.accumulatedTime += Date.now() - startTimeUpdate;
  };

  /**
   * Start up game loop
   */
  public Start = () => {
    if (!this.engineSettings.isRunning) {
      this.engineSettings.isRunning = true;
      this.engineSettings.rafId = setInterval(
        this.Loop,
        this.engineSettings.frameRating
      );
    }
  };

  /**
   * Stop game loop
   */
  public Stop = () => {
    if (this.engineSettings.rafId) clearInterval(this.engineSettings.rafId);
    this.engineSettings.isRunning = false;
  };
}
