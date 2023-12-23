import Head from "next/head";
import React, { useState } from "react";
import { GameRenderer } from "../Components";
import CharacterSelectionScreen from "../views/CharacterSelectionScreen";
import GameSceneScreen from "../views/GameScreen";
import LoadingScreen from "../views/LoadingScreen";
import LoginScreen from "../views/LoginScreen";
import SplashScreen from "../views/SplashScreen";
import TitleScreen from "../views/TitleScreen";
const gameRenderer = new GameRenderer();

export default function HomePage() {
  const gameSceneScreenRef = React.useRef<HTMLCanvasElement | null>(null);
  const [fadeState, setFadeState] = useState<
    "opacity-control-in" | "opacity-control-out"
  >("opacity-control-in");

  const [gameWidth] = useState<number>(1024);
  const [gameHeight] = useState<number>(768);

  const [view, setView] = useState<
    | "splash_screen"
    | "title_screen"
    | "loading_screen"
    | "login_screen"
    | "character_selection_screen"
    | "game_scene_screen"
  >("splash_screen");

  React.useEffect(() => {
    setTimeout(() => {
      setFadeState("opacity-control-out");

      setTimeout(() => {
        setView("title_screen");

        setFadeState("opacity-control-in");

        setTimeout(() => {
          setFadeState("opacity-control-out");

          setTimeout(() => {
            setView("login_screen");

            setFadeState("opacity-control-in");
          }, 1000);
        }, 4000);
      }, 1000);
    }, 4000);

    if (view === "game_scene_screen")
      gameRenderer.start(gameSceneScreenRef, gameWidth, gameHeight);
  }, []);

  return (
    <div id="MainBox">
      <Head>
        <title>Magic Domain v1.0.0</title>
      </Head>
      {view === "splash_screen" && <SplashScreen fadeState={fadeState} />}

      {view === "title_screen" && <TitleScreen fadeState={fadeState} />}

      {view === "loading_screen" && <LoadingScreen fadeState={fadeState} />}

      {view === "login_screen" && <LoginScreen fadeState={fadeState} />}

      {view === "character_selection_screen" && (
        <CharacterSelectionScreen fadeState={fadeState} />
      )}

      {view === "game_scene_screen" && (
        <GameSceneScreen canvaRef={gameSceneScreenRef} />
      )}
    </div>
  );
}
