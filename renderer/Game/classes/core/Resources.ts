import { resourceImagesType } from "../../types/resourceImagesType";

export class Resources {
  private toLoad: Record<string, string>;
  public images: Record<string, resourceImagesType>;

  constructor(staticResources: Record<string, string>) {
    this.toLoad = staticResources;
    this.images = {};
  }

  public loadResources = (): void => {
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
  };
}
