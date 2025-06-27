import { vanillaExtractPlugin as vanillaExtract } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [vanillaExtract() as any],
});
