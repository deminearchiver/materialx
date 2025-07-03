import { createThemeContract } from "@vanilla-extract/css";
import type { CSSVarFunction } from "~/utils";

export type Tokens<T> = {
  short1: T;
  short2: T;
  short3: T;
  short4: T;
  medium1: T;
  medium2: T;
  medium3: T;
  medium4: T;
  long1: T;
  long2: T;
  long3: T;
  long4: T;
  extraLong1: T;
  extraLong2: T;
  extraLong3: T;
  extraLong4: T;
};

export const createTokens = (): Tokens<CSSVarFunction> => {
  const template: Tokens<null> = {
    short1: null,
    short2: null,
    short3: null,
    short4: null,
    medium1: null,
    medium2: null,
    medium3: null,
    medium4: null,
    long1: null,
    long2: null,
    long3: null,
    long4: null,
    extraLong1: null,
    extraLong2: null,
    extraLong3: null,
    extraLong4: null,
  };
  return createThemeContract(template);
};

export const createValues = (): Tokens<string> => {
  return {
    short1: "50ms",
    short2: "100ms",
    short3: "150ms",
    short4: "200ms",
    medium1: "250ms",
    medium2: "300ms",
    medium3: "350ms",
    medium4: "400ms",
    long1: "450ms",
    long2: "500ms",
    long3: "550ms",
    long4: "600ms",
    extraLong1: "700ms",
    extraLong2: "800ms",
    extraLong3: "900ms",
    extraLong4: "1000ms",
  };
};
