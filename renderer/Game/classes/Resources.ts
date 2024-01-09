import { resourceImagesType } from "../types/resourceImagesType";

export class Resources {
  private toLoad: Record<string, string>;
  public images: Record<string, resourceImagesType>;

  constructor() {
    this.toLoad = {
      sky: "/sprites/sky.png",
      areaOne: "/sprites/area1.png",
      player: "/sprites/character_walk.png",
    };

    this.images = {};

    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image();

      img.src = this.toLoad[key];

      this.images[key] = {
        image: img,
        isLoaded: false,
      };

      img.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  }
}
