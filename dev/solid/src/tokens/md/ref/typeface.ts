import { createThemeContract } from "@vanilla-extract/css";
import type { CSSVarFunction, MapLeafNodes } from "~/utils";

export type TypefaceTokensRaw = {
  plain: string[];
  brand: string[];
  weightRegular: number;
  weightMedium: number;
  weightBold: number;
};

export type TypefaceTokens<T> = MapLeafNodes<TypefaceTokensRaw, T>;

export const createTokens = (): TypefaceTokens<CSSVarFunction> => {
  const template: TypefaceTokens<null> = {
    plain: null,
    brand: null,
    weightRegular: null,
    weightMedium: null,
    weightBold: null,
  };
  return createThemeContract(template);
};

export const createDefaultValuesRaw = (): TypefaceTokensRaw => {
  return {
    plain: ["Roboto Flex", "Roboto"],
    brand: ["Roboto Flex", "Roboto"],
    weightRegular: 400,
    weightMedium: 500,
    weightBold: 700,
  };
};

export const createDefaultValues = (): TypefaceTokens<string> => {
  return {
    plain: '"Roboto Flex", "Roboto"',
    brand: '"Roboto Flex", "Roboto"',
    weightRegular: "400",
    weightMedium: "500",
    weightBold: "700",
  };
};
