import { globalFontFace } from "@vanilla-extract/css";

export type MaterialSymbolsVariant = "outlined" | "rounded" | "sharp";

const VARIANT_TO_FONT_FAMILY: Record<MaterialSymbolsVariant, string> = {
  outlined: "Material Symbols Outlined",
  rounded: "Material Symbols Rounded",
  sharp: "Material Symbols Sharp",
};

// DO NOT REMOVE
const VARIANT_TO_SRC: Record<MaterialSymbolsVariant, string> = {
  outlined:
    "url(@fontsource-variable/material-symbols-outlined/files/material-symbols-outlined-latin-full-normal.woff2) format('woff2-variations')",
  rounded:
    "url(@fontsource-variable/material-symbols-rounded/files/material-symbols-rounded-latin-full-normal.woff2) format('woff2-variations')",
  sharp:
    "url(@fontsource-variable/material-symbols-sharp/files/material-symbols-sharp-latin-full-normal.woff2) format('woff2-variations')",
};

// TODO: decide if we should use VARIANT_TO_SRC or VARIANT_TO_URL
const VARIANT_TO_URL: Record<MaterialSymbolsVariant, string> = {
  outlined:
    "@fontsource-variable/material-symbols-outlined/files/material-symbols-outlined-latin-full-normal.woff2",
  rounded:
    "@fontsource-variable/material-symbols-rounded/files/material-symbols-rounded-latin-full-normal.woff2",
  sharp:
    "@fontsource-variable/material-symbols-sharp/files/material-symbols-sharp-latin-full-normal.woff2",
};

const materialSymbolsFontFace = (variant: MaterialSymbolsVariant) => {
  const fontFamily = VARIANT_TO_FONT_FAMILY[variant];
  const url = VARIANT_TO_URL[variant];
  globalFontFace(fontFamily, {
    src: `url(${url}) format('woff2-variations')`,
    unicodeRange:
      "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD",
    fontDisplay: "swap",
    fontWeight: "100 700",
    fontStyle: "normal",
  });
};

materialSymbolsFontFace("outlined");
materialSymbolsFontFace("rounded");
materialSymbolsFontFace("sharp");

const fontVariationSettings = (
  settings: Record<string, number | string>,
): string | undefined => {
  const result: string[] = [];
  for (const axis in settings) {
    const value = settings[axis];
    const setting = `"${axis}" ${value}`;
    result.push(setting);
  }
  return result.length > 0 ? result.join(", ") : undefined;
};
