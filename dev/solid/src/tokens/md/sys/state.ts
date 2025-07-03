import { createThemeContract } from "@vanilla-extract/css";
import type { CSSVarFunction } from "~/utils";

export type Token<T> = {
  stateLayerOpacity: T;
};

export type Tokens<T> = {
  hovered: Token<T>;
  focused: Token<T>;
  pressed: Token<T>;
  dragged: Token<T>;
};

export const createTokens = (): Tokens<CSSVarFunction> => {
  const template: Tokens<null> = {
    hovered: { stateLayerOpacity: null },
    focused: { stateLayerOpacity: null },
    pressed: { stateLayerOpacity: null },
    dragged: { stateLayerOpacity: null },
  };
  return createThemeContract(template);
};

export const createValues = (): Tokens<string> => {
  return {
    hovered: { stateLayerOpacity: "0.08" },
    focused: { stateLayerOpacity: "0.1" },
    pressed: { stateLayerOpacity: "0.1" },
    dragged: { stateLayerOpacity: "0.16" },
  };
};
