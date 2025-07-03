import { createThemeContract } from "@vanilla-extract/css";
import type { CSSVarFunction } from "~/utils";

export type Tokens<T> = {
  level0: T;
  level1: T;
  level2: T;
  level3: T;
  level4: T;
  level5: T;
};

export const createTokens = (): Tokens<CSSVarFunction> => {
  const template: Tokens<null> = {
    level0: null,
    level1: null,
    level2: null,
    level3: null,
    level4: null,
    level5: null,
  };
  return createThemeContract(template);
};

export const createValues = (): Tokens<string> => {
  // Elevation levels on web should use the level number, not the dp value.
  // We can remove this if the generated tokens swap from dp to level.
  return {
    level0: "0",
    level1: "1",
    level2: "2",
    level3: "3",
    level4: "4",
    level5: "5",
  };
};
