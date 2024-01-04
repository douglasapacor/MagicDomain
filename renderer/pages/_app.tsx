import { AppProps } from "next/app";
import "../public/styles/main.css";

const gameApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default gameApp;
