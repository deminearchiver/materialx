// type Primitive = string | boolean | number | null | undefined;

import { fallbackVar } from "@vanilla-extract/css";
import type { CSSVarFunction } from "@vanilla-extract/private";

// type MapLeafNodes<Obj, LeafType> = {
//     [Prop in keyof Obj]: Obj[Prop] extends Primitive ? LeafType : Obj[Prop] extends Record<string | number, any> ? MapLeafNodes<Obj[Prop], LeafType> : never;
// };

export type Tokens<T = unknown> = {
  [key: string]: T | Tokens<T>;
};

export type TokensLeaf<T extends Tokens> = T extends Tokens<infer U>
  ? U
  : never;

export type MapLeafNodes<T extends Tokens, U> = {
  [K in keyof T]: T[K] extends Tokens ? MapLeafNodes<T[K], U> : U;
};

export { type CSSVarFunction };

type MergeTokens = <
  T extends [Tokens, ...Tokens[]],
  U extends (...args: { [K in keyof T]: TokensLeaf<T[K]> }) => unknown,
>(
  callback: U,
  ...tokens: {
    [K in keyof T]: (<S>() => S extends MapLeafNodes<T[K], unknown>
      ? 1
      : 2) extends <S>() => S extends MapLeafNodes<T[0], unknown> ? 1 : 2
      ? T[K]
      : never;
  }
) => MapLeafNodes<T[0], ReturnType<U>>;

export const mergeTokens: MergeTokens = (
  callback: (...args: any[]) => any,
  ...tokens: any[]
): any => {
  const merge = (...tokens: any[]): any => {
    const result: Tokens<unknown> = {};
    const [first, ...rest] = tokens;
    for (const key in first) {
      const firstValue = first[key];
      const values = [firstValue, ...rest.map((set) => set[key])];
      const isObject =
        typeof firstValue === "object" &&
        firstValue !== null &&
        !Array.isArray(firstValue);
      const fn = isObject ? merge : callback;
      result[key] = fn(...values);
    }
    return result;
  };
  return merge(...tokens);
};

export const fallbackTokens = <T extends [Tokens<string>, ...Tokens<string>[]]>(
  ...tokens: {
    [K in keyof T]: (<S>() => S extends MapLeafNodes<T[K], unknown>
      ? 1
      : 2) extends <S>() => S extends MapLeafNodes<T[0], unknown> ? 1 : 2
      ? T[K]
      : never;
  }
): MapLeafNodes<T[0], string> => {
  // return mergeTokens<T, (...args: [string, ...string[]]) => string>(
  //   (...args) => fallbackVar(...args),
  //   ...tokens,
  // );
  return mergeTokens<T, (...args: [string, ...string[]]) => string>(
    fallbackVar,
    ...tokens,
  );
};

// type Test<T> = {
//   a: T;
//   b: T;
//   c: T;
//   d: {
//     e: T;
//     f: T;
//     g: T;
//   };
// };

// declare const testA: Test<CSSVarFunction>;
// declare const testB: Test<string>;
// const testC = mergeTokens((a, b) => "", testA, testB);
