export class Resources {
  public toLoad: Record<string, string>;
  public images: Record<
    string,
    {
      image: HTMLImageElement;
      isLoaded: boolean;
    }
  >;

  constructor() {
    this.images = {};
  }

  public loadResourceByName(name: string): void {
    const img = new Image();
    img.src = this.toLoad[name];

    this.images[name] = {
      image: img,
      isLoaded: false,
    };

    img.onload = () => {
      this.images[name].isLoaded = true;
    };
  }

  public unloadResourceByName(name: string): void {
    delete this.images[name];
  }

  public loadResourceList(name: string[]): void {
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
  }

  public unloadResourceList(name: string[]): void {
    for (let i = 0; i < name.length; i++) delete this.images[name[i]];
  }
}
