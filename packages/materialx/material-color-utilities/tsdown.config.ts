import { defineConfig } from "tsdown";

const noExternal = "@material/material-color-utilities";

export default defineConfig({
  entry: ["./src/index.ts"],
  format: ["esm", "cjs"],
  platform: "neutral",
  noExternal: [noExternal],
  dts: {
    resolve: [noExternal],
  },
});
