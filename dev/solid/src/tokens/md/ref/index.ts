import type { CSSVarFunction } from "~/utils";
import * as palette from "./palette";
import * as typeface from "./typeface";

export type Tokens<T> = {
  palette: palette.Tokens<T>;
  typeface: typeface.TypefaceTokens<T>;
};

export const createTokens = (): Tokens<CSSVarFunction> => {
  return {
    palette: palette.createTokens(),
    typeface: typeface.createTokens(),
  };
};

export { palette, typeface };
