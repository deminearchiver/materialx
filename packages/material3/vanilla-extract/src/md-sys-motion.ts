import { createTokensFactory } from "./utils";

export type MotionEasingTokens<T> = {
  linear: T;
  legacy: T;
  legacyAccelerate: T;
  legacyDecelerate: T;
  standard: T;
  standardAccelerate: T;
  standardDecelerate: T;
  emphasized: T;
  emphasizedAccelerate: T;
  emphasizedDecelerate: T;
};

export default createTokensFactory<MotionEasingTokens<unknown>>({
  template: () => ({
    linear: ["linear"],
    legacy: ["legacy"],
    legacyAccelerate: ["legacy", "accelerate"],
    legacyDecelerate: ["legacy", "decelerate"],
    standard: ["standard"],
    standardAccelerate: ["standard", "accelerate"],
    standardDecelerate: ["standard", "decelerate"],
    emphasized: ["emphasized"],
    emphasizedAccelerate: ["emphasized", "accelerate"],
    emphasizedDecelerate: ["emphasized", "decelerate"],
  }),
});
