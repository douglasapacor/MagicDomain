import { BrowserWindow, IpcMainInvokeEvent, ipcMain } from "electron";
import {
  gameCamera,
  gameCharacter,
  keyboardCommandData,
  readyToShipPackage,
} from "../types/GameMain";

export class GameMain {
  private browserWindow: BrowserWindow;
  private character: gameCharacter;
  private camera: gameCamera;

  constructor(browserWindow: BrowserWindow) {
    this.browserWindow = browserWindow;

    const windowSize = browserWindow.getSize();

    const width = windowSize[0] / 2;
    const heitgh = windowSize[1] / 2;

    this.camera = { x: width, y: heitgh, z: 1 };

    this.character = {
      name: "Douglas",
      x: width - 16,
      y: heitgh - 32,
      movement: {
        speed: 10,
        action: {
          _DOWN: false,
          _LEFT: false,
          _RIGTH: false,
          _UP: false,
        },
      },
    };

    ipcMain.on("KEYBOARD_COMMAND", this.keyboardCommand);

    setInterval(() => {
      this.calculateCharacterMovement();

      this.browserWindow.webContents.send("GAME_UPDATE", this.getPackage());
    }, 16);
  }

  private keyboardCommand = (
    _: IpcMainInvokeEvent,
    data: keyboardCommandData
  ) => {
    if (data.event === "keyup") {
      if (data.key === "w") {
        this.character.movement.action._UP = false;
      }
      if (data.key === "d") {
        this.character.movement.action._RIGTH = false;
      }
      if (data.key === "s") {
        this.character.movement.action._DOWN = false;
      }
      if (data.key === "a") {
        this.character.movement.action._LEFT = false;
      }
    }

    if (data.event === "keydown") {
      if (data.key === "w") {
        this.character.movement.action._UP = true;
      }
      if (data.key === "d") {
        this.character.movement.action._RIGTH = true;
      }
      if (data.key === "s") {
        this.character.movement.action._DOWN = true;
      }
      if (data.key === "a") {
        this.character.movement.action._LEFT = true;
      }
    }
  };

  private calculateCharacterMovement(): void {
    if (this.character.movement.action._UP) {
      this.character.y = this.character.y - this.character.movement.speed;
      this.camera.y = this.camera.y - this.character.movement.speed / 2;
    }
    if (this.character.movement.action._RIGTH) {
      this.character.x = this.character.x + this.character.movement.speed;
      this.camera.x = this.camera.x + this.character.movement.speed / 2;
    }
    if (this.character.movement.action._DOWN) {
      this.character.y = this.character.y + this.character.movement.speed;
      this.camera.y = this.camera.y + this.character.movement.speed / 2;
    }
    if (this.character.movement.action._LEFT) {
      this.character.x = this.character.x - this.character.movement.speed;
      this.camera.x = this.camera.x - this.character.movement.speed / 2;
    }
  }

  private getPackage = (): readyToShipPackage => {
    return {
      camera: {
        x: this.camera.x,
        y: this.camera.y,
        z: this.camera.z,
      },
      character: {
        name: this.character.name,
        position: {
          x: this.character.x,
          y: this.character.y,
        },
      },
    };
  };
}
