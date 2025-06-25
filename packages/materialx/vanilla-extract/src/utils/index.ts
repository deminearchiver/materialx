export type Tokens<T = unknown> = {
  [key: string]: T | Tokens<T>;
};

export type TokensLeaf<T extends Tokens> = T extends Tokens<infer U>
  ? U
  : never;

export type MapLeafNodes<T extends Tokens, U> = {
  [K in keyof T]: T[K] extends Tokens ? MapLeafNodes<T[K], U> : U;
};

// type ValidateTokens<T extends Tokens[], U, S> = {
//   [K in keyof T]: MapLeafNodes<T[0], unknown> extends MapLeafNodes<
//     T[K],
//     unknown
//   >
//     ? U
//     : S;
// };

export const mapTokens = <
  T extends [Tokens, ...Tokens[]],
  U extends (...args: { [K in keyof T]: TokensLeaf<T[K]> }) => unknown
>(
  callback: U,
  ...tokens: {
    [K in keyof T]: MapLeafNodes<T[0], unknown> extends MapLeafNodes<
      T[K],
      unknown
    >
      ? T[K]
      : never;
  }
): {
  [K in keyof T]: MapLeafNodes<T[0], unknown> extends MapLeafNodes<
    T[K],
    unknown
  >
    ? true
    : false;
} extends true[]
  ? MapLeafNodes<T[0], ReturnType<U>>
  : never => {
  const processTokens = (...tokens: Tokens<unknown>[]): Tokens<unknown> => {
    const result: Tokens<unknown> = {};
    const [first, ...rest] = tokens;
    for (const key in first) {
      const firstValue = first[key];
      const values = [firstValue, ...rest.map((set) => set[key])];
      const isObject =
        typeof firstValue === "object" &&
        firstValue !== null &&
        !Array.isArray(firstValue);
      const fn = isObject ? processTokens : callback;
      result[key] = fn(...(values as any));
    }
    return result;
  };
  return processTokens(...tokens) as any;
};

export type { CSSVarFunction } from "@vanilla-extract/private";
