import type { Options as OriginalOptions } from "tsdown";

export type Options = Partial<Omit<OriginalOptions, "entry">> &
  Pick<Required<OriginalOptions>, "entry">;

export const createConfig = (options: Options): OriginalOptions => {
  return {
    entry: options.entry,
    target: options.target ?? "esnext",
    platform: options.platform ?? "neutral",
    format: options.format ?? "esm",
    dts: true,
    outDir: options.outDir ?? "./dist",
    minify: options.minify ?? false,
    treeshake: options.treeshake ?? true,
  };
};
