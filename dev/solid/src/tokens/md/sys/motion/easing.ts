import { createThemeContract } from "@vanilla-extract/css";
import type { CSSVarFunction } from "~/utils";

export type Token<T> = [x1: T, y1: T, x2: T, y2: T];

export type Tokens<T> = {
  linear: T;
  emphasized: T;
  emphasizedAccelerate: T;
  emphasizedDecelerate: T;
  standard: T;
  standardAccelerate: T;
  standardDecelerate: T;
  legacy: T;
  legacyAccelerate: T;
  legacyDecelerate: T;
};

export const createTokens = (): Tokens<CSSVarFunction> => {
  const template: Tokens<null> = {
    emphasized: null,
    emphasizedAccelerate: null,
    emphasizedDecelerate: null,
    standard: null,
    standardAccelerate: null,
    standardDecelerate: null,
    legacy: null,
    legacyAccelerate: null,
    legacyDecelerate: null,
    linear: null,
  };
  return createThemeContract(template);
};

export const createValues = (tokens: Tokens<string>): Tokens<string> => {
  return {
    // Fallback to md.sys.motion.easing.standard
    // DON'T CHANGE this mapping: it is specified in the spec as:
    // md.sys.motion.easing.emphasized -> md.sys.motion.easing.standard -> cubic-bezier(0.2, 0, 0, 1)
    emphasized: tokens.standard,
    // TODO: make an automatic system for generating these
    // emphasized:
    //   "linear(" +
    //   "0, 0.00245 1.753%, 0.00994 3.55%, 0.01966 4.916%, 0.03415 6.402%, " +
    //   "0.05334 7.836%, 0.07376 9.061%, 0.10031 10.32%, 0.12808 11.414%, " +
    //   "0.15979 12.444%, 0.19399 13.366%, 0.27138 14.974%, 0.34403 16.052%, " +
    //   "0.47679 17.475%, 0.54434 18.338%, 0.60689 19.389%, 0.66036 20.609%, " +
    //   "0.71671 22.4%, 0.74193 23.444%, 0.76532 24.589%, 0.78755 25.874%, " +
    //   "0.80828 27.285%, 0.82719 28.791%, 0.84475 30.42%, 0.86492 32.632%, " +
    //   "0.88332 35.056%, 0.9002 37.721%, 0.91554 40.622%, 0.9295 43.795%, " +
    //   "0.94208 47.239%, 0.95333 50.97%, 0.96327 54.986%, 0.97199 59.335%, " +
    //   "0.9795 64.011%, 0.99095 74.434%, 0.99774 86.373%, 1" +
    //   ")",
    emphasizedAccelerate: "cubic-bezier(0.3, 0.0, 0.8, 0.15)",
    emphasizedDecelerate: "cubic-bezier(0.05, 0.7, 0.1, 1.0)",
    standard: "cubic-bezier(0.2, 0.0, 0.0, 1.0)",
    standardAccelerate: "cubic-bezier(0.3, 0.0, 1.0, 1.0)",
    standardDecelerate: "cubic-bezier(0.0, 0.0, 0.0, 1.0)",
    legacy: "cubic-bezier(0.4, 0.0, 0.2, 1.0)",
    legacyAccelerate: "cubic-bezier(0.4, 0.0, 1.0, 1.0)",
    legacyDecelerate: "cubic-bezier(0.0, 0.0, 0.2, 1.0)",
    linear: "linear",
  };
};
