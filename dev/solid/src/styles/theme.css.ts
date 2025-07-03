import {
  type DynamicSchemeOptions,
  type DynamicSchemeFromOptions,
  DynamicScheme,
  Variant,
  Platform,
  SpecVersion,
  Hct,
  argbFromHex,
} from "@materialx/material-color-utilities";
import { applyTextStyle, md } from "~/tokens";
import { fallbackTokens } from "~/utils";

import { Theme } from "~/theme";
import { assignVars, globalFontFace, globalStyle } from "@vanilla-extract/css";

type DynamicSchemeMode = "light" | "dark" | "black";
type Contrast = "normal" | "medium" | "high";
const CONTRAST_LEVELS: Record<Contrast, number> = {
  normal: 0.0,
  medium: 0.5,
  high: 1.0,
};

type CreateDynamicSchemeOptions = Omit<
  DynamicSchemeFromOptions,
  "sourceColorHct" | "isDark" | "platform" | "specVersion" | "contrastLevel"
> & {
  sourceColor?: string | number | Hct;
  mode: DynamicSchemeMode;
  contrast?: Contrast | number;
};

const createDynamicScheme = ({
  sourceColor,
  mode,
  contrast = "normal",
  ...rest
}: CreateDynamicSchemeOptions): DynamicScheme =>
  DynamicScheme.from({
    variant: Variant.TONAL_SPOT,
    ...(rest as DynamicSchemeFromOptions),
    sourceColorHct: sourceColor
      ? sourceColor instanceof Hct
        ? sourceColor
        : Hct.fromInt(
            typeof sourceColor === "string"
              ? argbFromHex(sourceColor)
              : sourceColor,
          )
      : undefined,
    contrastLevel:
      typeof contrast === "number" ? contrast : CONTRAST_LEVELS[contrast],
    platform: mode === "black" ? Platform.WATCH : Platform.PHONE,
    specVersion: SpecVersion.SPEC_2025,
    isDark: mode !== "light",
  });

const light = createDynamicScheme({ mode: "light" });
const dark = createDynamicScheme({ mode: "dark" });

globalStyle(`:root:not([data-theme])`, {
  colorScheme: "light dark",
  "@media": {
    "(prefers-color-scheme: light)": {
      vars: assignVars(
        Theme("tokens").sys.color,
        md.sys.color.colorValuesFromDynamicScheme(light),
      ),
    },
    "(prefers-color-scheme: dark)": {
      vars: assignVars(
        Theme("tokens").sys.color,
        md.sys.color.colorValuesFromDynamicScheme(dark),
      ),
    },
  },
});

globalStyle(`:root[data-theme="light"]`, {
  colorScheme: "light",
  vars: assignVars(
    Theme("tokens").sys.color,
    md.sys.color.colorValuesFromDynamicScheme(light),
  ),
});

globalStyle(`:root[data-theme="dark"]`, {
  colorScheme: "dark",
  vars: assignVars(
    Theme("tokens").sys.color,
    md.sys.color.colorValuesFromDynamicScheme(dark),
  ),
});

const font: string[] = ["Roboto Flex"];

const fontFamily = font
  .map((fontFace) => (fontFace.includes(" ") ? `"${fontFace}"` : fontFace))
  .join(", ");

globalStyle(":root", {
  vars: {
    [Theme("tokens").ref.typeface.plain]: fontFamily,
    [Theme("tokens").ref.typeface.brand]: fontFamily,
  },
});

// console.dir(Theme, { depth: null });

globalFontFace("Roboto Flex", {
  src: "url(@fontsource-variable/roboto-flex/files/roboto-flex-latin-full-normal.woff2) format('woff2-variations')",
  unicodeRange:
    "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD",
  fontDisplay: "swap",
  fontStyle: "oblique 0deg 10deg",
  fontWeight: "100 1000",
  fontStretch: "25% 151%",
});

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("*", {
  margin: 0,
});

globalStyle(":root", {
  fontSynthesis: "none",
  textRendering: "optimizeLegibility",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

globalStyle("*", {
  "@supports": {
    "(scrollbar-width: auto)": {
      scrollbarWidth: "auto",
      scrollbarColor: `${Theme().sys.color.outline} transparent`,
    },
  },
});

globalStyle("button", {
  appearance: "none",
  outline: "none",
  border: "none",
  background: "none",
  minWidth: 48,
  minHeight: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  paddingInline: 16,
  paddingBlock: 10,
  borderRadius: Theme().sys.shape.corner.full,
  backgroundColor: Theme().sys.color.primary,
  color: Theme().sys.color.onPrimary,
  ...applyTextStyle(Theme().sys.typescale.labelLarge),
  transitionProperty: "border-radius",
  // transitionTimingFunction: Theme.spring().fastSpatial.easing,
  // transitionDuration: Theme.spring().fastSpatial.duration,
  cursor: "pointer",
  // vars: {
  //   [Theme.component.ripple.hoverColor]: Theme.color.onPrimary,
  //   [Theme.component.ripple.pressedColor]: Theme.color.onPrimary,
  // },
});

globalStyle("button:active", {
  borderRadius: Theme().sys.shape.corner.small,
});
