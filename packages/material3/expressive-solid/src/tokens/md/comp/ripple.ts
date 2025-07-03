import { createThemeContract } from "@vanilla-extract/css";
import type { CSSVarFunction } from "@vanilla-extract/private";

export type RippleToken<T> = {
  color: T;
  opacity: T;
};

export type RippleTokens<T> = {
  hovered: RippleToken<T>;
  // This one will exist in md-comp-state-layer
  // focused: RippleToken<T>;
  pressed: RippleToken<T>;
};

export const createToken = (): RippleToken<CSSVarFunction> => {
  const template: RippleToken<null> = {
    color: null,
    opacity: null,
  };
  return createThemeContract(template);
};

export const createTokens = (): RippleTokens<CSSVarFunction> => {
  return {
    hovered: createToken(),
    pressed: createToken(),
  };
};
