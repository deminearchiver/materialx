import type { CSSVarFunction } from "~/utils";
import { type Tokens, fallback, tokens, values } from "./tokens.css";

import "./contract.css";

export type ThemeMode = keyof ThemeModes;

export type ThemeModes = {
  tokens: Tokens<CSSVarFunction>;
  values: Tokens<string>;
  fallback: Tokens<string>;
};

const THEME_MODES: ThemeModes = {
  tokens: tokens,
  values: values,
  fallback: fallback,
};

export const Theme = <T extends ThemeMode = "fallback">(
  mode?: T,
): ThemeModes[T] => THEME_MODES[mode ?? "fallback"] as any;
