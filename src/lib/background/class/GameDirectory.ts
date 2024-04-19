/* eslint-disable @typescript-eslint/no-explicit-any */
import path from "path";
import { GameFileSistem } from "./GameFileSistem";

export class GameDirectory {
  private _name: string;
  private _location: string;
  private _fullName: string;
  private _childrens: unknown[];
  private _isValidated = false;

  constructor(name: string, location: string) {
    this._name = name;
    this._location = location;
    this._fullName = path.join(location, name);
    this._childrens = [];

    if (!GameFileSistem.existDirectory(this._fullName)) {
      GameFileSistem.createDirectory(this._fullName);
    }

    this._isValidated = true;
  }

  public get name(): string {
    return this._name;
  }

  public get fullName(): string {
    return this._fullName;
  }

  public set addChildren(children: any) {
    this._childrens.push(children);
  }
}
