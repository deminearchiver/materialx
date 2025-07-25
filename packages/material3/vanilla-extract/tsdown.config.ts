import { defineConfig } from "tsdown";

export default defineConfig({
  entry: { color: "./src/color", "md-comp-ripple": "./src/md-comp-ripple.ts" },
  platform: "neutral",
  format: "esm",
  dts: true,
});
