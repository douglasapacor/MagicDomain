import { Howl } from "howler";
import { FC, useEffect, useRef } from "react";

const LoginScreen: FC<{
  fadeState: "opacity-control-in" | "opacity-control-out";
}> = ({ ...props }) => {
  const backgroundMusic = useRef<Howl | null>(null);

  useEffect(() => {
    backgroundMusic.current = new Howl({
      src: ["/sounds/main-teste.mp3"], // Substitua pelo caminho correto do seu arquivo de música
      loop: true,
      volume: 1,
    });

    backgroundMusic.current.play();
  }, []);
  return (
    <div id="LoginScreenBox" className={props.fadeState}>
      <div id="LoginServerBox">
        <div id="Screenline">
          <p>Server</p>
        </div>
      </div>

      <div className="screen-line screen-title">
        <p>Magic Domain®</p>
      </div>
      <div className="screen-line w3">
        <input type="text" className="w12" placeholder="usuário" />
      </div>
      <div className="screen-line w3">
        <input type="password" className="w12" placeholder="senha" />
      </div>
      <div className="screen-line w3" style={{ padding: "3px" }}>
        <button
          id="ButtonLogin"
          onClick={() => {
            backgroundMusic.current.stop();
          }}
        >
          Login
        </button>
      </div>

      <div id="LoginPropertiesBox">
        <div id="Screenline">
          <p>Client version: 1.0.0</p>
        </div>
        <div id="Screenline">
          <p>Servidor: chanXinChan - Status: Online</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
