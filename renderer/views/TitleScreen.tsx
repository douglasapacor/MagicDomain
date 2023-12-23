import { FC } from "react";

const TitleScreen: FC<{
  fadeState: "opacity-control-in" | "opacity-control-out";
}> = ({ ...props }) => {
  return (
    <div id="TitleScreenBox" className={`title-screen-box ${props.fadeState}`}>
      <img src="/images/eq_logo.png" alt="EpicQuest Logo" />
    </div>
  );
};

export default TitleScreen;
