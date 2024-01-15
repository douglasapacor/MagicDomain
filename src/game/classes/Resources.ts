import * as assets from "../../assets";
import { resourceImagesType } from "../types/resourceImagesType";

export class Resources {
  private toLoad: typeof assets;
  public images: Record<string, resourceImagesType>;

  constructor() {
    this.images = {};
    this.toLoad = assets;
  }

  public loadResources = (): void => {
    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image();

      img.src = this.toLoad[key as keyof typeof this.toLoad];

      this.images[key] = {
        image: img,
        isLoaded: false,
      };

      img.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  };
}
