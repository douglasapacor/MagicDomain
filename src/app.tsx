import { createRoot } from "react-dom/client";
import GameView from "./gameView";

const container = document.getElementById("react-app");
const root = createRoot(container);
root.render(<GameView />);
