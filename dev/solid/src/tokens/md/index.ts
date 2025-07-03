import * as ref from "./ref";
import * as sys from "./sys";
import * as comp from "./comp";
import type { CSSVarFunction } from "~/utils";

export type Tokens<T> = {
  ref: ref.Tokens<T>;
  sys: sys.Tokens<T>;
};

export const createTokens = (): Tokens<CSSVarFunction> => {
  return {
    ref: ref.createTokens(),
    sys: sys.createTokens(),
  };
};

export { ref, sys, comp };
