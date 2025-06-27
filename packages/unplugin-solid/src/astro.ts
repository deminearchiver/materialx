import type { Options } from ".";
import type { AstroIntegration } from "astro";

import vite from "./vite";

export default (options?: Options): AstroIntegration => ({
  name: "unplugin-solid",
  hooks: {
    "astro:config:setup": async (astro) => {
      astro.config.vite.plugins ||= [];
      astro.config.vite.plugins.push(vite(options));
    },
  },
});
