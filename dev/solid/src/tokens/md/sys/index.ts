import type { CSSVarFunction } from "~/utils";
import * as color from "./color";
import * as shape from "./shape";
import * as state from "./state";
import * as typescale from "./typescale";
import * as elevation from "./elevation";
import * as motion from "./motion";

export type Tokens<T> = {
  color: color.Tokens<T>;
  shape: shape.Tokens<T>;
  state: state.Tokens<T>;
  typescale: typescale.Tokens<T>;
  elevation: elevation.Tokens<T>;
  motion: motion.Tokens<T>;
};

export const createTokens = (): Tokens<CSSVarFunction> => {
  return {
    color: color.createTokens(),
    shape: shape.createTokens(),
    state: state.createTokens(),
    typescale: typescale.createTokens(),
    elevation: elevation.createTokens(),
    motion: motion.createTokens(),
  };
};

export { color, shape, state, typescale, elevation, motion };
