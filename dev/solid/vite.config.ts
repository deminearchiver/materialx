import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import solid from "vite-plugin-solid";
import { vanillaExtractPlugin as vanillaExtract } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  optimizeDeps: {
    exclude: ["fsevents"],
  },
  plugins: [
    // Ensure tsconfigPaths runs the first
    tsconfigPaths(),

    // Ensure solid runs after MDX
    solid({ extensions: [".md", ".mdx"] }),

    // Ensure vanillaExtract runs before other CSS processing plugins
    vanillaExtract(),
  ],
});
