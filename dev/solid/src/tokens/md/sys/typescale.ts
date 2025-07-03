import { createThemeContract, type CSSProperties } from "@vanilla-extract/css";
import type { CSSVarFunction } from "@vanilla-extract/private";
import type * as typeface from "../ref/typeface";
import type { MapLeafNodes } from "~/utils";

export type Token<T> = MapLeafNodes<RawToken, T>;

export type BaselineTokens<T> = {
  displayLarge: Token<T>;
  displayMedium: Token<T>;
  displaySmall: Token<T>;
  headlineLarge: Token<T>;
  headlineMedium: Token<T>;
  headlineSmall: Token<T>;
  titleLarge: Token<T>;
  titleMedium: Token<T>;
  titleSmall: Token<T>;
  bodyLarge: Token<T>;
  bodyMedium: Token<T>;
  bodySmall: Token<T>;
  labelLarge: Token<T>;
  labelMedium: Token<T>;
  labelSmall: Token<T>;
};

export type EmphasizedTokens<T> = {
  displayLargeEmphasized: Token<T>;
  displayMediumEmphasized: Token<T>;
  displaySmallEmphasized: Token<T>;
  headlineLargeEmphasized: Token<T>;
  headlineMediumEmphasized: Token<T>;
  headlineSmallEmphasized: Token<T>;
  titleLargeEmphasized: Token<T>;
  titleMediumEmphasized: Token<T>;
  titleSmallEmphasized: Token<T>;
  bodyLargeEmphasized: Token<T>;
  bodyMediumEmphasized: Token<T>;
  bodySmallEmphasized: Token<T>;
  labelLargeEmphasized: Token<T>;
  labelMediumEmphasized: Token<T>;
  labelSmallEmphasized: Token<T>;
};

export type Tokens<T> = BaselineTokens<T> & EmphasizedTokens<T>;

export const createToken = (): Token<CSSVarFunction> => {
  const template: Token<null> = {
    font: null,
    weight: null,
    size: null,
    tracking: null,
    lineHeight: null,
    wght: null,
    grad: null,
    wdth: null,
    rond: null,
    opsz: null,
    crsv: null,
    slnt: null,
    fill: null,
    hexp: null,
  };
  return createThemeContract(template);
};

export const createTokens = (): Tokens<CSSVarFunction> => {
  return {
    displayLarge: createToken(),
    displayMedium: createToken(),
    displaySmall: createToken(),
    headlineLarge: createToken(),
    headlineMedium: createToken(),
    headlineSmall: createToken(),
    titleLarge: createToken(),
    titleMedium: createToken(),
    titleSmall: createToken(),
    bodyLarge: createToken(),
    bodyMedium: createToken(),
    bodySmall: createToken(),
    labelLarge: createToken(),
    labelMedium: createToken(),
    labelSmall: createToken(),
    displayLargeEmphasized: createToken(),
    displayMediumEmphasized: createToken(),
    displaySmallEmphasized: createToken(),
    headlineLargeEmphasized: createToken(),
    headlineMediumEmphasized: createToken(),
    headlineSmallEmphasized: createToken(),
    titleLargeEmphasized: createToken(),
    titleMediumEmphasized: createToken(),
    titleSmallEmphasized: createToken(),
    bodyLargeEmphasized: createToken(),
    bodyMediumEmphasized: createToken(),
    bodySmallEmphasized: createToken(),
    labelLargeEmphasized: createToken(),
    labelMediumEmphasized: createToken(),
    labelSmallEmphasized: createToken(),
  };
};

export type RawToken = {
  font: string;
  weight: number | string;
  size: number | string;
  tracking: number | string;
  lineHeight: number | string;
  wght: number | string;
  grad: number | string;
  wdth: number | string;
  rond: number | string;
  opsz: number | string;
  crsv: number | string;
  slnt: number | string;
  fill: number | string;
  hexp: number | string;
};

const spToPx = (value: RawToken): Token<string> => {
  return {
    font: value.font,
    weight: `${value.weight}`,
    size: `${value.size}px`,
    tracking: `${value.tracking}px`,
    lineHeight: `${value.lineHeight}px`,
    wght: `${value.weight}`,
    grad: `${value.grad}`,
    wdth: `${value.wdth}`,
    rond: `${value.rond}`,
    opsz: `${value.opsz}`,
    crsv: `${value.crsv}`,
    slnt: `${value.slnt}`,
    fill: `${value.fill}`,
    hexp: `${value.hexp}`,
  };
};

// DO NOT CHANGE
const REM_SIZE = 16;

const spToRem = (value: RawToken): Token<string> => {
  return {
    font: value.font,
    weight: `${value.weight}`,
    size:
      typeof value.size === "number"
        ? `${value.size / REM_SIZE}rem`
        : value.size,
    tracking:
      typeof value.tracking === "number"
        ? `${value.tracking / REM_SIZE}rem`
        : value.tracking,
    lineHeight:
      typeof value.lineHeight === "number"
        ? typeof value.size === "number"
          ? `${value.lineHeight / value.size}`
          : `${value.lineHeight / REM_SIZE}rem`
        : value.lineHeight,
    wght: `${value.weight}`,
    grad: `${value.grad}`,
    wdth: `${value.wdth}`,
    rond: `${value.rond}`,
    opsz: `${value.opsz}`,
    crsv: `${value.crsv}`,
    slnt: `${value.slnt}`,
    fill: `${value.fill}`,
    hexp: `${value.hexp}`,
  };
};

export const createValues = (
  typeface: typeface.TypefaceTokens<CSSVarFunction>,
): Tokens<string> => {
  const convert: (value: RawToken) => Token<string> = spToRem;
  const withDefaults = (value: {
    font: string;
    weight: number | string;
    size: number;
    tracking: number;
    lineHeight: number;
  }) =>
    convert({
      font: value.font,
      weight: value.weight,
      size: value.size,
      tracking: value.tracking,
      lineHeight: value.lineHeight,
      wght: value.weight,
      grad: 0,
      wdth: 100,
      rond: 0,
      opsz: value.size,
      crsv: 0,
      slnt: 0,
      fill: 0,
      hexp: 0,
    });

  const withWeight = (
    value: Token<string>,
    weight: string | number,
  ): Token<string> => ({
    ...value,
    weight: `${weight}`,
    wght: `${weight}`,
  });

  const baselineValues: BaselineTokens<string> = {
    displayLarge: withDefaults({
      font: typeface.brand,
      weight: typeface.weightRegular,
      size: 57,
      lineHeight: 64,
      tracking: -0.25,
    }),
    displayMedium: withDefaults({
      font: typeface.brand,
      weight: typeface.weightRegular,
      size: 45,
      lineHeight: 52,
      tracking: 0,
    }),
    displaySmall: withDefaults({
      font: typeface.brand,
      weight: typeface.weightRegular,
      size: 36,
      lineHeight: 44,
      tracking: 0,
    }),
    headlineLarge: withDefaults({
      font: typeface.brand,
      weight: typeface.weightRegular,
      size: 32,
      lineHeight: 40,
      tracking: 0,
    }),
    headlineMedium: withDefaults({
      font: typeface.brand,
      weight: typeface.weightRegular,
      size: 28,
      lineHeight: 36,
      tracking: 0,
    }),
    headlineSmall: withDefaults({
      font: typeface.brand,
      weight: typeface.weightRegular,
      size: 24,
      lineHeight: 32,
      tracking: 0,
    }),
    titleLarge: withDefaults({
      font: typeface.brand,
      weight: typeface.weightRegular,
      size: 22,
      lineHeight: 28,
      tracking: 0,
    }),
    titleMedium: withDefaults({
      font: typeface.plain,
      weight: typeface.weightMedium,
      size: 16,
      lineHeight: 24,
      tracking: 0.15,
    }),
    titleSmall: withDefaults({
      font: typeface.plain,
      weight: typeface.weightMedium,
      size: 14,
      lineHeight: 20,
      tracking: 0.1,
    }),
    bodyLarge: withDefaults({
      font: typeface.plain,
      weight: typeface.weightRegular,
      size: 16,
      lineHeight: 24,
      tracking: 0.5,
    }),
    bodyMedium: withDefaults({
      font: typeface.plain,
      weight: typeface.weightRegular,
      size: 14,
      lineHeight: 20,
      tracking: 0.25,
    }),
    bodySmall: withDefaults({
      font: typeface.plain,
      weight: typeface.weightRegular,
      size: 12,
      lineHeight: 16,
      tracking: 0.4,
    }),
    labelLarge: withDefaults({
      font: typeface.plain,
      weight: typeface.weightMedium,
      size: 14,
      lineHeight: 20,
      tracking: 0.1,
    }),
    labelMedium: withDefaults({
      font: typeface.plain,
      weight: typeface.weightMedium,
      size: 12,
      lineHeight: 16,
      tracking: 0.5,
    }),
    labelSmall: withDefaults({
      font: typeface.plain,
      weight: typeface.weightMedium,
      size: 11,
      lineHeight: 16,
      tracking: 0.5,
    }),
  };
  const emphasizedValues: EmphasizedTokens<string> = {
    displayLargeEmphasized: withWeight(
      baselineValues.displayLarge,
      typeface.weightMedium,
    ),
    displayMediumEmphasized: withWeight(
      baselineValues.displayMedium,
      typeface.weightMedium,
    ),
    displaySmallEmphasized: withWeight(
      baselineValues.displaySmall,
      typeface.weightMedium,
    ),
    headlineLargeEmphasized: withWeight(
      baselineValues.headlineLarge,
      typeface.weightMedium,
    ),
    headlineMediumEmphasized: withWeight(
      baselineValues.headlineMedium,
      typeface.weightMedium,
    ),
    headlineSmallEmphasized: withWeight(
      baselineValues.headlineSmall,
      typeface.weightMedium,
    ),
    titleLargeEmphasized: withWeight(
      baselineValues.titleLarge,
      typeface.weightMedium,
    ),
    titleMediumEmphasized: withWeight(
      baselineValues.titleMedium,
      typeface.weightBold,
    ),
    titleSmallEmphasized: withWeight(
      baselineValues.titleSmall,
      typeface.weightBold,
    ),
    bodyLargeEmphasized: withWeight(
      baselineValues.bodyLarge,
      typeface.weightMedium,
    ),
    bodyMediumEmphasized: withWeight(
      baselineValues.bodyMedium,
      typeface.weightMedium,
    ),
    bodySmallEmphasized: withWeight(
      baselineValues.bodySmall,
      typeface.weightMedium,
    ),
    labelLargeEmphasized: withWeight(
      baselineValues.labelLarge,
      typeface.weightBold,
    ),
    labelMediumEmphasized: withWeight(
      baselineValues.labelMedium,
      typeface.weightBold,
    ),
    labelSmallEmphasized: withWeight(
      baselineValues.labelSmall,
      typeface.weightBold,
    ),
  };
  return { ...baselineValues, ...emphasizedValues };
};

type TypescaleCss = {
  fontFamily: string;
  fontWeight: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  fontVariationSettings: string;
};

type TypescaleCssLegacy = Pick<
  CSSProperties,
  | "fontFamily"
  | "fontWeight"
  | "fontSize"
  | "lineHeight"
  | "letterSpacing"
  | "fontVariationSettings"
>;

export const cssFromTypescale = (style: Token<string>): TypescaleCss => {
  const variationAxes = {
    wght: style.wght,
    GRAD: style.grad,
    wdth: style.wdth,
    ROND: style.rond,
    opsz: style.opsz,
    CRSV: style.crsv,
    slnt: style.slnt,
    FILL: style.fill,
    HEXP: style.hexp,
  };
  const fontVariationSettings = Object.entries(variationAxes)
    .map(([axis, value]) => `"${axis}" ${value}`)
    .join(", ");
  return {
    fontFamily: style.font,
    fontWeight: style.weight,
    fontSize: style.size,
    lineHeight: style.lineHeight,
    letterSpacing: style.tracking,
    fontVariationSettings,
  };
};
