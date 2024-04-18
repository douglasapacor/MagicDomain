import path from "path";
import { GameFileSistem } from "./GameFileSistem";

export class GameFile {
  private _name: string;
  private _location: string;
  private _fullName: string;
  private _isValidated = false;

  constructor(name: string, location: string) {
    this._name = `${this._name}.json`;
    this._location = location;
    this._fullName = path.join(location, name);

    if (!GameFileSistem.existFile(this._fullName))
      GameFileSistem.existFile(this._fullName);

    this._isValidated = true;
  }

  public get name(): string {
    return this._name;
  }

  public get isValidated(): boolean {
    return this._isValidated;
  }

  public set isValidated(v: boolean) {
    this._isValidated = v;
  }
}

