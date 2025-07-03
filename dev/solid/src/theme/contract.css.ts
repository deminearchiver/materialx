import { md } from "~/tokens";
import { duration, type easing } from "~/tokens/md/sys/motion";
import type { MotionScheme } from "~/tokens/md/sys/motion/spring";
import type { CSSVarFunction } from "~/utils";

// type FunctionPart<T> = () => T;
// type ObjectPart<T> = T;

// type GetterAnd<T extends Record<string, any>> = ObjectPart<T> & FunctionPart<T>;

// type Options = {
//   motionScheme: MotionScheme;
// };

// interface CreateOptions<
//   T extends Record<string, any>,
//   U extends (this: T, ...args: any[]) => any,
// > {
//   this: T;
//   call: U;
// }

// type CreateResult<T, U> = T & U;

// const create = <
//   T extends Record<string, any>,
//   U extends (this: T, ...args: any[]) => any,
// >(
//   options: CreateOptions<T, U>,
// ): T & U => Object.assign(options.call.bind(options.this), options.this) as any;

// const standardTokens = md.sys.motion.spring.createTokens();
// const expressiveTokens = md.sys.motion.spring.createTokens();

// type MdSysMotionSpringOptions = {
//   motionScheme: MotionScheme;
// };

type SpringCallback<T> = (options: { motionScheme?: MotionScheme }) => T;

type ResolvedSpringToken<T> = md.sys.motion.spring.Token<T>;
type SpringToken<T> = SpringCallback<ResolvedSpringToken<T>> &
  ResolvedSpringToken<SpringCallback<T>>;

type RawSpringTokens<T> = {
  defaultSpatial: T;
  defaultEffects: T;
  fastSpatial: T;
  fastEffects: T;
  slowSpatial: T;
  slowEffects: T;
};
type ResolvedSpringTokens<T> = RawSpringTokens<ResolvedSpringToken<T>>;
type UnresolvedSpringTokens<T> = SpringCallback<ResolvedSpringTokens<T>> &
  RawSpringTokens<SpringToken<T>>;

// const standardSpringTokens = md.sys.motion.spring.createTokens();
// const expressiveSpringTokens = md.sys.motion.spring.createTokens();

// const createSpringCallback = <T>(
//   variants: Record<MotionScheme, T>,
// ): SpringCallback<T> => {
//   return ({ motionScheme = "expressive" }) => variants[motionScheme];
// };

// const spring: UnresolvedSpringTokens<CSSVarFunction> = Object.assign(
//   createSpringCallback({
//     standard: standardSpringTokens,
//     expressive: expressiveSpringTokens,
//   }),
//   // {
//   //   fastSpatial: Object.assign(
//   //     createSpringCallback({
//   //       standard: standardSpringTokens.fastSpatial,
//   //       expressive: expressiveSpringTokens.fastSpatial,
//   //     }),
//   //     {
//   //       duration: createSpringCallback({
//   //         standard: standardSpringTokens.fastSpatial.duration,
//   //         expressive: expressiveSpringTokens.fastSpatial.duration,
//   //       }),
//   //       easing: createSpringCallback({
//   //         standard: standardSpringTokens.fastSpatial.easing,
//   //         expressive: expressiveSpringTokens.fastSpatial.easing,
//   //       }),
//   //     },
//   //   ),
//   // },

// );
// console.log(spring.fastSpatial);

// spring.fastEffects("standard").duration;

// type SpringTokensCallable<T> = {};

// const springTemplateInner: ResolvedSpringToken<null> = {
//   duration: null,
//   easing: null,
// };

// const springTemplate: ResolvedSpringTokens<null> = {
//   defaultEffects: springTemplateInner,
//   defaultSpatial: springTemplateInner,
//   fastEffects: springTemplateInner,
//   fastSpatial: springTemplateInner,
//   slowEffects: springTemplateInner,
//   slowSpatial: springTemplateInner,
// };

type ResolvedTokens<T> = {
  [key: string]: T | ResolvedTokens<T>;
};
type RawTokens<T> = { [key: string]: T };
type TokenType<T extends RawTokens<any>> = T extends RawTokens<infer U>
  ? U
  : never;
type TokensCallback<T, U extends any[]> = (...args: U) => T;
type ResolvedTokensMap<
  T extends ResolvedTokens<any>,
  U,
> = T extends ResolvedTokens<infer S>
  ? {
      [K in keyof T]: T[K] extends ResolvedTokens<S>
        ? ResolvedTokensMap<T[K], U>
        : U;
    }
  : never;
type UnresolvedTokens<
  T extends ResolvedTokens<any>,
  U extends any[],
> = TokensCallback<T, U> & {
  [K in keyof T]: UnresolvedTokens<T[K], U>;
};

declare const a: UnresolvedTokens<
  ResolvedSpringTokens<CSSVarFunction>,
  [motionScheme: MotionScheme]
>;

// a("expressive");

// a.fastEffects("expressive").duration;
// a.fastEffects.duration("expressive");

type TreeLeaf = {
  [key: string]: unknown;
};
type Tree = {
  [key: string]: (() => unknown) | Tree;
};

const createNestedAccessor = <T extends Tree>(tree: T, property: keyof T) => {};

const createResolverTree = <T extends Tree>(tree: T) => {
  for (const key in tree) {
    console.log(key, tree[key]);
  }
  const handler: ProxyHandler<any> = {
    apply(target, thisArg, argArray) {},
    get(target, property: string, receiver) {},
  };
  return new Proxy(tree, handler);
};

const spring = createResolverTree(() => ({
  fastSpatial: {
    a: () => ({}),
    b: {},
  },
  fastEffects: () => ({}),
}));

console.log(spring.fastSpatial);
