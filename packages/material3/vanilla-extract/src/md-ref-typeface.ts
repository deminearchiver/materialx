import { createThemeContract } from "@vanilla-extract/css";
import type { CSSVarFunction } from "@vanilla-extract/private";

export type TypefaceFontTokens<T> = {
  plain: T;
  brand: T;
};

export type TypefaceWeightTokens<T> = {
  regular: T;
  medium: T;
  bold: T;
};

export type TypefaceTokens<T> = TypefaceFontTokens<T> & {
  weight: TypefaceWeightTokens<T>;
};

export const createTypefaceFontTokens =
  (): TypefaceFontTokens<CSSVarFunction> => {
    const template: TypefaceFontTokens<null> = {
      plain: null,
      brand: null,
    };
    return createThemeContract(template);
  };

export const createTypefaceWeightTokens =
  (): TypefaceWeightTokens<CSSVarFunction> => {
    const template: TypefaceWeightTokens<null> = {
      regular: null,
      medium: null,
      bold: null,
    };
    return createThemeContract(template);
  };

export const createTypefaceTokens = (): TypefaceTokens<CSSVarFunction> => {
  return {
    ...createTypefaceFontTokens(),
    weight: createTypefaceWeightTokens(),
  };
};

export const getTypefaceFontDefaults = (): TypefaceFontTokens<string> => {
  return { plain: "Roboto", brand: "Roboto" };
};

export const getTypefaceWeightDefaults = (): TypefaceWeightTokens<string> => {
  return {
    regular: "400",
    medium: "500",
    bold: "700",
  };
};

export const getTypefaceDefaults = (): TypefaceTokens<string> => {
  return {
    ...getTypefaceFontDefaults(),
    weight: getTypefaceWeightDefaults(),
  };
};
