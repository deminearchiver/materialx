import { defineConfig, type Options, type UserConfig } from "tsdown";
import solid from "unplugin-solid/rolldown";

const generateConfig = (jsx: boolean): Options => ({
  entry: ["./src/index.ts"],
  target: "esnext",
  platform: "browser",
  format: "esm",
  dts: !jsx,
  outExtensions: jsx ? () => ({ js: ".jsx" }) : undefined,
  plugins: !jsx ? [solid({ solid: { generate: "dom" } })] : [],
});

export default defineConfig([generateConfig(false), generateConfig(true)]);
