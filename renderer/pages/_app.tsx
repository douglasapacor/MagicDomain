import type { AppProps } from "next/app";
import "../public/styles/main.css";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
}
