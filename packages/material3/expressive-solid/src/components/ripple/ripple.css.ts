import { fallbackVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { Theme } from "../../tokens";

const shared = style({
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  borderRadius: "inherit",
});

export const host = recipe({
  base: [
    shared,
    {
      margin: "auto",
      display: "flex",
      pointerEvents: "none",

      "@media": {
        "(forced-colors: active)": {
          display: "none",
        },
      },
    },
  ],
  variants: {
    disabled: {
      true: {
        display: "none",
      },
    },
  },
});

export const surface = recipe({
  base: [
    shared,
    {
      WebkitTapHighlightColor: "transparent",
      "::before": {
        // Shared
        content: "",
        position: "absolute",
        opacity: 0,

        // Specific
        backgroundColor: Theme.comp.ripple.hovered.color,
        inset: 0,
        transitionProperty: "opacity, background-color",
        transitionDuration: "15ms",
        transitionTimingFunction: "linear",
      },
      "::after": {
        // Shared
        content: "",
        position: "absolute",
        opacity: 0,

        // Specific
        background: `radial-gradient(closest-side, ${Theme.comp.ripple.pressed.color} max(calc(100% - 70%), 65%), transparent 100%)`,
        transformOrigin: "center center",
        transitionProperty: "opacity",
        transitionDuration: "375ms",
        transitionTimingFunction: "linear",
      },
    },
  ],
  variants: {
    hovered: {
      true: {
        "::before": {
          backgroundColor: Theme.comp.ripple.hovered.color,
          opacity: Theme.comp.ripple.hovered.opacity,
        },
      },
    },
    pressed: {
      true: {
        "::after": {
          // press ripple fade-in
          opacity: Theme.comp.ripple.pressed.opacity,
          transitionDuration: "105ms",
        },
      },
    },
  },
});
