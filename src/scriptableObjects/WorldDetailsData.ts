import { DataHolder } from "../../src/lib/render";

type worldParameters = {
  No: number;
  name: string;
  advantages: string[];
  disadvantges: string[];
  description: {
    pt_br: string;
    en_us: string;
  };
};

const DATA_NAME = "WorldDetailsData";

export class WorldDetailsData extends DataHolder {
  public worlds: Map<string | number, worldParameters> = new Map();

  constructor() {
    super(DATA_NAME);

    this.worlds.set(1, {
      No: 1,
      name: "Xibalba",
      advantages: ["Cura", "Maldição"],
      disadvantges: ["Elemental", "Fortalecimento"],
      description: {
        pt_br:
          "Um mundo de magia espiritual e conexão com o mundo dos mortos, onde a cura através de ervas e rituais e a destruição mágica são ferramentas utilizadas para equilibrar os reinos. A magia ofensiva direta é vista como um último recurso, utilizada apenas para combater desequilíbrios graves.",
        en_us: "",
      },
    });

    this.worlds.set(2, {
      No: 2,
      name: "Aethel",
      advantages: ["Elemental", "Fortalecimento"],
      disadvantges: ["Cura", "Maldição"],
      description: {
        pt_br:
          "Um mundo de magia elemental bruta, onde a conjuração de magias poderosas e a criação de escudos mágicos impenetráveis são altamente valorizadas. A cura e a destruição direta são vistas com desconfiança, incentivando soluções mais sutis e estratégicas.",
        en_us: "",
      },
    });

    this.worlds.set(3, {
      No: 3,
      name: "Mu",
      advantages: ["Invocação", "Fortalecimento"],
      disadvantges: ["Cura", "Maldição"],
      description: {
        pt_br:
          "Um mundo de magia ancestral e conexão com outras dimensões, onde a invocação de entidades poderosas e a criação de escudos mágicos ancestrais são essenciais para a sobrevivência. A cura e a destruição direta são vistas como desequilíbrios que podem trazer consequências graves.",
        en_us: "",
      },
    });
  }

  public getDetails(No: number): worldParameters {
    return this.worlds.get(No);
  }
}
