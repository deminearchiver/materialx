import { createThemeContract } from "@vanilla-extract/css";
import type { CSSVarFunction } from "~/utils";

export type Corners<T> = {
  startStart: T;
  startEnd: T;
  endEnd: T;
  endStart: T;
};
export type CornerRadiusTokens<T> = {
  none: T;
  extraSmall: T;
  small: T;
  medium: T;
  large: T;

  largeIncreased: T;
  extraLarge: T;
  extraLargeIncreased: T;
  extraExtraLarge: T;
  full: T;
};
export type CornerCompositeTokens<T> = {
  extraSmallTop: Corners<T>;
  largeStart: Corners<T>;
  largeEnd: Corners<T>;
  largeTop: Corners<T>;
  extraLargeTop: Corners<T>;
};

export type CornerTokens<T> = CornerRadiusTokens<T> & CornerCompositeTokens<T>;
export type CornerValueTokens<T> = {
  none: T;
  extraSmall: T;
  small: T;
  medium: T;
  large: T;
  largeIncreased: T;
  extraLarge: T;
  extraLargeIncreased: T;
  extraExtraLarge: T;
};

export type Tokens<T> = {
  corner: CornerTokens<T>;
  cornerValue: CornerValueTokens<T>;
};

export const createCornerValueTokens =
  (): CornerValueTokens<CSSVarFunction> => {
    const template: CornerValueTokens<null> = {
      none: null,
      extraSmall: null,
      small: null,
      medium: null,
      large: null,
      largeIncreased: null,
      extraLarge: null,
      extraLargeIncreased: null,
      extraExtraLarge: null,
    };
    return createThemeContract(template);
  };

export const createCornerToken = (): Corners<CSSVarFunction> => {
  const template: Corners<null> = {
    startStart: null,
    startEnd: null,
    endEnd: null,
    endStart: null,
  };
  return createThemeContract(template);
};

export const createCornerRadiusTokens =
  (): CornerRadiusTokens<CSSVarFunction> => {
    const template: CornerRadiusTokens<null> = {
      none: null,
      extraSmall: null,
      small: null,
      medium: null,
      large: null,
      largeIncreased: null,
      extraLarge: null,
      extraLargeIncreased: null,
      extraExtraLarge: null,
      full: null,
    };
    return createThemeContract(template);
  };

export const createCornerCompositeTokens =
  (): CornerCompositeTokens<CSSVarFunction> => {
    return {
      extraSmallTop: createCornerToken(),
      largeStart: createCornerToken(),
      largeEnd: createCornerToken(),
      largeTop: createCornerToken(),
      extraLargeTop: createCornerToken(),
    };
  };

export const createCornerTokens = (): CornerTokens<CSSVarFunction> => {
  return {
    ...createCornerRadiusTokens(),
    ...createCornerCompositeTokens(),
  };
};

export const createTokens = (): Tokens<CSSVarFunction> => {
  return {
    corner: createCornerTokens(),
    cornerValue: createCornerValueTokens(),
  };
};

export const createCornerCompositeValues = (
  corner: CornerRadiusTokens<string>,
): CornerCompositeTokens<string> => {
  return {
    extraSmallTop: {
      startStart: corner.extraSmall,
      startEnd: corner.extraSmall,
      endEnd: corner.none,
      endStart: corner.none,
    },
    largeTop: {
      startStart: corner.large,
      startEnd: corner.large,
      endEnd: corner.none,
      endStart: corner.none,
    },
    largeStart: {
      startStart: corner.large,
      startEnd: corner.none,
      endEnd: corner.none,
      endStart: corner.large,
    },
    largeEnd: {
      startStart: corner.none,
      startEnd: corner.large,
      endEnd: corner.large,
      endStart: corner.none,
    },
    extraLargeTop: {
      startStart: corner.extraLarge,
      startEnd: corner.extraLarge,
      endEnd: corner.none,
      endStart: corner.none,
    },
  };
};

export const createCornerRadiusValues = (
  cornerValue: CornerValueTokens<string>,
): CornerRadiusTokens<string> => {
  return {
    none: cornerValue.none,
    extraSmall: cornerValue.extraSmall,
    small: cornerValue.small,
    medium: cornerValue.medium,
    large: cornerValue.large,
    largeIncreased: cornerValue.largeIncreased,
    extraLarge: cornerValue.extraLarge,
    extraLargeIncreased: cornerValue.extraLargeIncreased,
    extraExtraLarge: cornerValue.extraExtraLarge,
    full: "9999px",
  };
};

export const createCornerValues = (
  shape: Tokens<string>,
): CornerTokens<string> => {
  return {
    ...createCornerRadiusValues(shape.cornerValue),
    ...createCornerCompositeValues(shape.corner),
  };
};

export const createCornerValueValues = (): CornerValueTokens<string> => {
  return {
    none: "0px",
    extraSmall: "4px",
    small: "8px",
    medium: "12px",
    large: "16px",
    largeIncreased: "20px",
    extraLarge: "28px",
    extraLargeIncreased: "32px",
    extraExtraLarge: "48px",
  };
};

export const createValues = (tokens: Tokens<string>): Tokens<string> => {
  return {
    corner: createCornerValues(tokens),
    cornerValue: createCornerValueValues(),
  };
};
