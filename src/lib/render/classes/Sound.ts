/* eslint-disable @typescript-eslint/no-explicit-any */
import { IpcRendererEvent } from "electron";
import { GAME_EVENTS } from "../../../statics/eventlist";
import { generateKey } from "../helpers/randoms";

export class Sound {
  private readonly _name: string;
  private readonly _ext: "mp3" | "wav";
  private _isLoaded: boolean;
  private _arrayBuffer: ArrayBufferLike;
  private _audioContext: AudioContext;
  private _audioBuffer: AudioBuffer;
  private _audioSource: AudioBufferSourceNode;
  private readonly _event_response_Id: string = `${GAME_EVENTS.RESPONSE_SOUND}_${generateKey(5)}`;

  public onload = () => {};

  constructor(name: string, ext: "mp3" | "wav") {
    this._name = name;
    this._ext = ext;
    this._isLoaded = false;

    window.bridge.on(
      this._event_response_Id,
      async (_: IpcRendererEvent, ...args: { audioData: string }[]) => {
        try {
          if (!this.isValidBase64(args[0].audioData)) {
            throw new Error(
              `Dados de som inválidos (base64) para: ${this._name}`,
            );
          }

          const stringArray = atob(args[0].audioData);
          const byteArray = new Uint8Array(stringArray.length);

          for (let i = 0; i < stringArray.length; i++) {
            byteArray[i] = stringArray.charCodeAt(i);
          }

          this._arrayBuffer = byteArray.buffer;
          this._audioContext = new AudioContext();
          this._audioBuffer = await this._audioContext.decodeAudioData(
            this._arrayBuffer,
          );
        } catch (error: any) {
          console.error(
            `Erro ao carregar arquivo de som: ${this._name}\nDetalhes do erro:\n    -nome: ${error.name}\n    -message: ${error.message}`,
          );
        } finally {
          this.onload();
        }
      },
    );
  }

  public play(): void {
    try {
      if (!this._isLoaded) {
        throw new Error(`Som não carregado: ${this._name}`);
      }

      this._audioSource = this._audioContext.createBufferSource();
      this._audioSource.buffer = this._audioBuffer;
      this._audioSource.connect(this._audioContext.destination);

      this._audioSource.start();
    } catch (error) {
      console.error(
        `Erro ao executar arquivo de som: ${this._name}\nDetalhes do erro:\n    -nome: ${error.name}\n    -message: ${error.message}`,
      );
    }
  }

  public dispose(): void {
    if (this._audioContext) {
      this._audioContext.close();
    }
  }

  private isValidBase64(data: string): boolean {
    const base64Regex = /^[A-Za-z0-9+/]+=*$/;
    return base64Regex.test(data);
  }

  public get name(): string {
    return this._name;
  }

  public get ext(): string {
    return this._ext;
  }

  public get eventResponseId(): string {
    return this._event_response_Id;
  }

  public set isLoaded(isLoaded: boolean) {
    this._isLoaded = isLoaded;
  }
}
