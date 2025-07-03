export type Tokens<T> = {
  [key: string]: T | Tokens<T>;
};

export interface TokenSetFactoryOptions<T extends Tokens<unknown>> {
  tokens: (builders: TokenBuilders) => T;
}

export interface TokenSetFactory<T extends Tokens<unknown>> {}

export const defineTokenSet = <T extends Tokens<unknown>>(
  options: TokenSetFactoryOptions<T>,
): TokenSetFactory<T> => {
  return {};
};

export interface TokenBuilders {
  group: (children: Tokens<unknown>) => Token<typeof TOKEN>;
}

declare const TOKEN: unique symbol;

export type Token<T extends symbol> = {
  [K in T]: true;
};

export interface FontWeightToken {}
export interface GroupToken {
  
}

export const defineToken = () => {};

export interface ValueBuilders {
  linear: () => {};
  cubic: () => {};
  svg: () => {};
}
