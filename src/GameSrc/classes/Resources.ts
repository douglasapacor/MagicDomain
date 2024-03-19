export class Resources {
  private toLoad: Record<string, string>;
  public images: Record<
    string,
    {
      image: HTMLImageElement;
      isLoaded: boolean;
    }
  >;

  constructor(toLoadStatics: Record<string, string>) {
    this.toLoad = toLoadStatics;
    this.images = {};
  }

  loadAllResources = () => {
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

  loadResourceByName = (name: string) => {
    const img = new Image();
    img.src = this.toLoad[name];

    this.images[name] = {
      image: img,
      isLoaded: false,
    };

    img.onload = () => {
      this.images[name].isLoaded = true;
    };
  };

  unloadResourceByName = (name: string) => {
    delete this.images[name];
  };

  loadResourceList = (name: string[]) => {
    for (let i = 0; i < name.length; i++) {
      const img = new Image();

      img.src = this.toLoad[name[i]];

      this.images[name[i]] = {
        image: img,
        isLoaded: false,
      };

      img.onload = () => {
        this.images[name[i]].isLoaded = true;
      };
    }
  };

  unloadResourceList = (name: string[]) => {
    for (let i = 0; i < name.length; i++) {
      delete this.images[name[i]];
    }
  };
}