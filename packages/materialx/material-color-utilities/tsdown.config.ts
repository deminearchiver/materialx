import { defineConfig } from "tsdown";

const noExternal = "@material/material-color-utilities";

export default defineConfig({
  entry: "./src/*.ts",
  format: "esm",
  platform: "neutral",
  noExternal: [noExternal],
  dts: {
    resolve: [noExternal],
  },
});
