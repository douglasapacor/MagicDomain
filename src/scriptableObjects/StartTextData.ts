import { TextHolder } from "../lib/render";

export class StartTextData extends TextHolder {
  constructor() {
    super("startTextData");

    this.addLine(1, "Magic Domain® v0.0.1");
    this.addLine(2, "Magic Domain é um jogo criado pelo studio Epic Quest©.");
    this.addLine(
      3,
      "Magic Domain é um jogo de fantasia sem qualquer ligação com a realidade.",
    );
    this.addLine(
      4,
      "Toda e qualquer semelhança com o mundo real é mera conhecidencia e não deve-",
    );

    this.addLine(
      5,
      " ser considerado como reprodução de um fato ou opnião da empresa ou dos",
    );

    this.addLine(6, "desenvolvedores.");
  }

  public getData(): StartTextData {
    return this;
  }
}

