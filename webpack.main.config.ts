import type { Configuration } from "webpack";
import { plugins } from "./webpack.plugins";
import { rules } from "./webpack.rules";

export const mainConfig: Configuration = {
  entry: "./src/structure/background.ts",
  mode: "development",
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};
