import { defineConfig } from "tsdown";

export default defineConfig({
  entry: [
    "./src/index.ts",
    "./src/astro.ts",
    "./src/esbuild.ts",
    "./src/farm.ts",
    "./src/rolldown.ts",
    "./src/rollup.ts",
    "./src/rspack.ts",
    "./src/vite.ts",
    "./src/webpack.ts",
  ],
  format: "esm",
  platform: "node",
  dts: true,
});
