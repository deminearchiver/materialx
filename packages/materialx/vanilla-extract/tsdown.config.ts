import { defineConfig } from "tsdown";

export default defineConfig({
  entry: { index: "./src/index.ts", utils: "./src/utils/" },
  platform: "node",
  format: "esm",
  dts: true,
});
