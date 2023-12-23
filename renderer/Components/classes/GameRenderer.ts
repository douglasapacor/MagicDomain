import { MutableRefObject } from "react";
import { packageReceived } from "../types/GameRenderer";

export class GameRenderer {
  private canva: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private devicePixelRatio: number;
  private mapa: HTMLImageElement;

  public start = (
    canvasRef: MutableRefObject<HTMLCanvasElement>,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    this.canva = canvasRef.current;
    this.context = this.canva.getContext("2d");
    this.devicePixelRatio = window.devicePixelRatio || 1;
    this.canva.width = canvasWidth * this.devicePixelRatio;
    this.canva.height = canvasHeight * this.devicePixelRatio;

    this.mapa = new Image();
    this.mapa.src = "/images/map/mapp01.png";

    window.ipc.on("GAME_UPDATE", this.update);

    window.addEventListener("keydown", (event: KeyboardEvent) => {
      window.ipc.send("KEYBOARD_COMMAND", {
        event: "keydown",
        key: event.key,
      });
    });

    window.addEventListener("keyup", (event: KeyboardEvent) => {
      window.ipc.send("KEYBOARD_COMMAND", {
        event: "keyup",
        key: event.key,
      });
    });
  };

  private update = (data: packageReceived): void => {
    this.context.clearRect(0, 0, this.canva.width, this.canva.height);

    const cameraX = -data.camera.x + this.canva.width / 2;
    const cameraY = -data.camera.y + this.canva.height / 2;

    this.context.translate(cameraX, cameraY);
    this.context.translate(cameraX, cameraY);

    this.context.scale(data.camera.z, data.camera.z);

    this.context.drawImage(this.mapa, 0, 0);

    this.context.fillStyle = "#000";
    this.context.fillText(
      data.character.name,
      data.character.position.x,
      data.character.position.y - 5
    );
    this.context.fillRect(
      data.character.position.x,
      data.character.position.y,
      32,
      64
    );

    // this.context.drawImage(this.maps.initialTeste, 0, 0);

    this.context.setTransform(1, 0, 0, 1, 0, 0);
  };
}
