import Head from "next/head";
import React from "react";

export default function HomePage() {
  const [message, setMessage] = React.useState("No message found");

  React.useEffect(() => {
    window.ipc.on("message", (message: string) => {
      setMessage(message);
    });
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Magic Domain - Nextron (basic-lang-typescript)</title>
      </Head>
      <div></div>
    </React.Fragment>
  );
}
