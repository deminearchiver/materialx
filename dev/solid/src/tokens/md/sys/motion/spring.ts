import { createThemeContract } from "@vanilla-extract/css";
import type { CSSVarFunction } from "~/utils";

export type PhysicalToken<T> = {
  stiffness: T;
  damping: T;
};

export type VisualToken<T> = {
  easing: T;
  duration: T;
};

export type SpringPhysicalTokens<T> = {
  defaultSpatial: PhysicalToken<T>;
  defaultEffects: PhysicalToken<T>;
  fastSpatial: PhysicalToken<T>;
  fastEffects: PhysicalToken<T>;
  slowSpatial: PhysicalToken<T>;
  slowEffects: PhysicalToken<T>;
};
export type VisualTokens<T> = {
  defaultSpatial: VisualToken<T>;
  defaultEffects: VisualToken<T>;
  fastSpatial: VisualToken<T>;
  fastEffects: VisualToken<T>;
  slowSpatial: VisualToken<T>;
  slowEffects: VisualToken<T>;
};

export const createPhysicalToken = (): PhysicalToken<CSSVarFunction> => {
  const template: PhysicalToken<null> = {
    stiffness: null,
    damping: null,
  };
  return createThemeContract(template);
};

export const createVisualToken = (): VisualToken<CSSVarFunction> => {
  const template: VisualToken<null> = {
    easing: null,
    duration: null,
  };
  return createThemeContract(template);
};

export const createPhysicalTokens =
  (): SpringPhysicalTokens<CSSVarFunction> => {
    return {
      defaultSpatial: createPhysicalToken(),
      defaultEffects: createPhysicalToken(),
      fastSpatial: createPhysicalToken(),
      fastEffects: createPhysicalToken(),
      slowSpatial: createPhysicalToken(),
      slowEffects: createPhysicalToken(),
    };
  };

export const createVisualTokens = (): VisualTokens<CSSVarFunction> => {
  return {
    defaultSpatial: createVisualToken(),
    defaultEffects: createVisualToken(),
    fastSpatial: createVisualToken(),
    fastEffects: createVisualToken(),
    slowSpatial: createVisualToken(),
    slowEffects: createVisualToken(),
  };
};

export type MotionScheme = "standard" | "expressive";

const PHYSICAL_VALUES: Record<
  MotionScheme,
  () => SpringPhysicalTokens<number>
> = {
  standard: () => ({
    defaultSpatial: {
      damping: 0.9,
      stiffness: 700,
    },
    defaultEffects: {
      damping: 1,
      stiffness: 1600,
    },
    fastSpatial: {
      damping: 0.9,
      stiffness: 1400,
    },
    fastEffects: {
      damping: 1,
      stiffness: 3800,
    },
    slowSpatial: {
      damping: 0.9,
      stiffness: 300,
    },
    slowEffects: {
      damping: 1,
      stiffness: 800,
    },
  }),
  expressive: () => ({
    defaultSpatial: {
      damping: 0.8,
      stiffness: 380,
    },
    defaultEffects: {
      damping: 1,
      stiffness: 1600,
    },
    fastSpatial: {
      damping: 0.6,
      stiffness: 800,
    },
    fastEffects: {
      damping: 1,
      stiffness: 3800,
    },
    slowSpatial: {
      damping: 0.8,
      stiffness: 200,
    },
    slowEffects: {
      damping: 1,
      stiffness: 800,
    },
  }),
};

export const createPhysicalValues = (
  scheme: MotionScheme,
): SpringPhysicalTokens<number> => {
  return PHYSICAL_VALUES[scheme]();
};

type SpringVisualDefaultsSource = "spec";

const VISUAL_VALUES: Record<
  SpringVisualDefaultsSource,
  Record<MotionScheme, () => VisualTokens<string>>
> = {
  spec: {
    expressive: () => ({
      fastSpatial: {
        easing: "cubic-bezier(0.42, 1.67, 0.21, 0.90)",
        duration: "350ms",
      },
      defaultSpatial: {
        easing: "cubic-bezier(0.38, 1.21, 0.22, 1.00)",
        duration: "500ms",
      },
      slowSpatial: {
        easing: "cubic-bezier(0.39, 1.29, 0.35, 0.98)",
        duration: "650ms",
      },
      fastEffects: {
        easing: "cubic-bezier(0.31, 0.94, 0.34, 1.00)",
        duration: "150ms",
      },
      defaultEffects: {
        easing: "cubic-bezier(0.34, 0.80, 0.34, 1.00)",
        duration: "200ms",
      },
      slowEffects: {
        easing: "cubic-bezier(0.34, 0.88, 0.34, 1.00)",
        duration: "300ms",
      },
    }),
    standard: () => ({
      fastSpatial: {
        easing: "cubic-bezier(0.27, 1.06, 0.18, 1.00)",
        duration: "350ms",
      },
      defaultSpatial: {
        easing: "cubic-bezier(0.27, 1.06, 0.18, 1.00)",
        duration: "500ms",
      },
      slowSpatial: {
        easing: "cubic-bezier(0.27, 1.06, 0.18, 1.00)",
        duration: "750ms",
      },
      fastEffects: {
        easing: "cubic-bezier(0.31, 0.94, 0.34, 1.00)",
        duration: "150ms",
      },
      defaultEffects: {
        easing: "cubic-bezier(0.34, 0.80, 0.34, 1.00)",
        duration: "200ms",
      },
      slowEffects: {
        easing: "cubic-bezier(0.34, 0.88, 0.34, 1.00)",
        duration: "300ms",
      },
    }),
  },
};

export const createVisualValues = (
  scheme: MotionScheme,
): VisualTokens<string> => {
  return VISUAL_VALUES.spec[scheme]();
};

export type Token<T> = VisualToken<T>;
export type Tokens<T> = VisualTokens<T>;

export const createToken = createVisualToken;
export const createTokens = createVisualTokens;
export const createValues = createVisualValues;
