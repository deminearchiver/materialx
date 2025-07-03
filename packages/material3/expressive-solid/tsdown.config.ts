import { defineConfig, type Options, type UserConfig } from "tsdown";
import solid from "unplugin-solid/rolldown";

const cssFileFilter: RegExp = /\.css\.(js|cjs|mjs|jsx|ts|tsx)(\?used)?$/;

const generateConfig = (jsx: boolean): Options => {
  const jsExtension = jsx ? "jsx" : "js";
  const cssExtension = "css";

  const resolvedCssExtension = `.${cssExtension}`;
  const resolvedJsExtension = `.${jsExtension}`;
  const resolvedCssJsExtension = `${resolvedCssExtension}${resolvedJsExtension}`;

  const vanillaCssChunkGroupName = "vanilla-css";

  return {
    entry: ["./src/index.ts"],
    target: "esnext",
    platform: "neutral",
    format: "esm",
    unbundle: true,
    // outputOptions: {
    //   advancedChunks: {
    //     groups: [
    //       {
    //         name: vanillaCssChunkGroupName,
    //         test: cssFileFilter,
    //       },
    //     ],
    //   },
    //   chunkFileNames: (chunkInfo) => {
    //     const extension =
    //       chunkInfo.name === vanillaCssChunkGroupName
    //         ? resolvedCssJsExtension
    //         : resolvedJsExtension;
    //     return `[name]-[hash].${extension}`;
    //   },
    //   externalLiveBindings: false,
    // },
    dts: !jsx ? {} : false,
    outExtensions: ({ options }) => {
      return jsx ? { js: ".jsx" } : {};
    },
    plugins: !jsx ? [solid({ solid: { generate: "dom" } })] : [],
  };
};

export default defineConfig([generateConfig(false), generateConfig(true)]);
