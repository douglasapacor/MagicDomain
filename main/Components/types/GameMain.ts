export type gameCamera = { x: number; y: number; z: number };

export type gameCharacter = {
  name: string;
  x: number;
  y: number;
  movement: {
    speed: number;
    action: {
      _UP: boolean;
      _DOWN: boolean;
      _LEFT: boolean;
      _RIGTH: boolean;
    };
  };
};

export type keyboardCommandData = {
  event: "keyup" | "keydown";
  key: string;
};

export type gameCharacterPackage = {
  name: string;
  position: { x: number; y: number };
};

export type readyToShipPackage = {
  camera: gameCamera;
  character: gameCharacterPackage;
};
