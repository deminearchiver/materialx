import type { CSSVarFunction } from "~/utils";
import * as duration from "./duration";
import * as easing from "./easing";
import * as spring from "./spring";

export type Tokens<T> = {
  duration: duration.Tokens<T>;
  easing: easing.Tokens<T>;
  spring: spring.Tokens<T>;
};

export const createTokens = (): Tokens<CSSVarFunction> => {
  return {
    duration: duration.createTokens(),
    easing: easing.createTokens(),
    spring: spring.createTokens(),
  };
};

export { duration, easing, spring };
