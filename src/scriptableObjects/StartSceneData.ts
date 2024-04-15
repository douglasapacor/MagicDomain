import { DataHolder } from "../lib/render";

const DATA_NAME = "StartSceneData";

export class StartSceneData extends DataHolder {
  public text: Map<string | number, string> = new Map();
  constructor() {
    super(DATA_NAME);

    this.text.set(1, "Magic Domain® v0.0.1");
    this.text.set(2, "Magic Domain é um jogo criado pelo studio Epic Quest©.");
    this.text.set(
      3,
      "Magic Domain é um jogo de fantasia sem qualquer ligação com a realidade.",
    );
    this.text.set(
      4,
      "Toda e qualquer semelhança com o mundo real é mera conhecidencia e não deve -",
    );
    this.text.set(
      5,
      " ser considerado como reprodução de um fato ou opnião da empresa ou dos",
    );
    this.text.set(6, "desenvolvedores.");
  }

  public line(key: string | number): string | undefined {
    return this.text.get(key);
  }
}

