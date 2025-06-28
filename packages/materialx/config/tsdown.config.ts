import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    tsdown: "./src/tsdown/index.ts",
  },
  target: "esnext",
  format: "esm",
  platform: "node",
  dts: true,
});
