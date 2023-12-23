import { FC } from "react";

const SplashScreen: FC<{
  fadeState: "opacity-control-in" | "opacity-control-out";
}> = ({ ...props }) => {
  return (
    <div id="splashScreenBox" className={props.fadeState}>
      <div className="screen-line screen-title">
        <p>Magic Domain®</p>
      </div>

      <div className="screen-line screen-subtitle">
        <p>Magic Domain v1.0.0 is produced by Epic Quest© 2024</p>
      </div>

      <div className="screen-line" />

      <div className="screen-line">
        <p>
          Magic Domain is a brand of the Epic Quest company. The game has free
          content available on the internet and its creators are present in the
          credits area.
        </p>
      </div>

      <div className="screen-line">
        <p>
          Magic Domain is a project with the primary purpose of learning for
          those involved who seek to evolve to enable valuable and engaging
          stable titles for the future.
        </p>
      </div>

      <div className="screen-line">
        <p>For contact, please use the email epicquest@epicquetti.com.br.</p>
      </div>
    </div>
  );
};

export default SplashScreen;
