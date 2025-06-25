import { defineConfig } from "tsdown";

export default defineConfig({
  entry: { index: "./src/index.ts", utils: "./src/utils/" },
  platform: "neutral",
  format: "esm",
  dts: true,
});
