import { md } from "~/tokens";
import { fallbackTokens, type CSSVarFunction } from "~/utils";

export type Tokens<T> = md.Tokens<T>;

export const tokens: Tokens<CSSVarFunction> = md.createTokens();
export const values: Tokens<string> = {
  ref: {
    palette: md.ref.palette.createValues(),
    typeface: md.ref.typeface.createDefaultValues(),
  },
  sys: {
    shape: md.sys.shape.createValues(tokens.sys.shape),
    state: md.sys.state.createValues(),
    elevation: md.sys.elevation.createValues(),
    typescale: md.sys.typescale.createValues(tokens.ref.typeface),
  },
} as Tokens<string>;

const fallbackShapeCorner = fallbackTokens(
  tokens.sys.shape.corner,
  values.sys.shape.corner,
);

const mdSysShapeCornerRadiusTokens = md.sys.shape.createCornerRadiusTokens();
const mdSysShapeCornerCompositeTokens =
  md.sys.shape.createCornerCompositeTokens();
const mdSysShapeCornerValueTokens = md.sys.shape.createCornerValueTokens();

const mdSysShapeCornerValueValues = md.sys.shape.createCornerValueValues();
const mdSysShapeCornerValueFallback = fallbackTokens(
  mdSysShapeCornerValueTokens,
  mdSysShapeCornerValueValues,
);
const mdSysShapeCornerRadiusValues = md.sys.shape.createCornerRadiusValues(
  mdSysShapeCornerValueFallback,
);
const mdSysShapeCornerRadiusFallback = fallbackTokens(
  mdSysShapeCornerRadiusTokens,
  mdSysShapeCornerRadiusValues,
);
const mdSysShapeCornerCompositeValues =
  md.sys.shape.createCornerCompositeValues(mdSysShapeCornerRadiusFallback);
const mdSysShapeCornerCompositeFallback = fallbackTokens(
  mdSysShapeCornerCompositeTokens,
  mdSysShapeCornerCompositeValues,
);

export const fallback: Tokens<string> = {
  ref: {
    palette: fallbackTokens(tokens.ref.palette, values.ref.palette),
    typeface: fallbackTokens(tokens.ref.typeface, values.ref.typeface),
  },
  sys: {
    color: tokens.sys.color,
    shape: {
      corner: {
        ...mdSysShapeCornerCompositeFallback,
        ...mdSysShapeCornerRadiusFallback,
      },
      cornerValue: mdSysShapeCornerValueFallback,
    },
    elevation: fallbackTokens(tokens.sys.elevation, values.sys.elevation),
    state: fallbackTokens(tokens.sys.state, values.sys.state),
    motion: tokens.sys.motion,
    typescale: fallbackTokens(tokens.sys.typescale, values.sys.typescale),
  },
};

// console.dir(fallback, { depth: null });
