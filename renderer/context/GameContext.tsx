import { createContext, FC, ReactNode, useContext } from "react";

type gameContextType = {};

const GameContextDefaultValues: gameContextType = {};

const GameContext = createContext<gameContextType>(GameContextDefaultValues);

export function useGameContext(): gameContextType {
  return useContext(GameContext);
}

const GameControll: FC<{ children?: ReactNode }> = ({ ...props }) => {
  const value: gameContextType = {};

  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
};

export default GameControll;
