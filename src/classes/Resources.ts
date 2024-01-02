import { resourceImage } from "../types/resourceImage";

class Resources {
  private toLoad: Record<string, string>;
  public images: Record<string, resourceImage>;

  constructor() {
    this.toLoad = {
      sky: "/sprites/sky.png",
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

export const resources = new Resources();
