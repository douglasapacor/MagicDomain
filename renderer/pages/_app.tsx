import type { AppProps } from "next/app";
import Head from "next/head";
import GameControll from "../context/GameContext";
import "../public/css/base.css";

export default function GameViewApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <GameControll>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>Magic Domain. 1.0.0</title>
      </Head>
      <Component {...pageProps} />
    </GameControll>
  );
}
