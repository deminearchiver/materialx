import {
  type CSSVarFunction,
  type MapLeafNodes,
  type Tokens,
  type TokensLeaf,
  mapTokens,
} from "@materialx/vanilla-extract/utils";
import { createThemeContract } from "@vanilla-extract/css";

export interface CreateTokensFactoryOptions<T extends Tokens> {
  template: () => MapLeafNodes<T, string[]>;
}

export interface TokensFactoryOptions<T extends Tokens> {}

export type TokensFactory<T extends Tokens> = (
  options: TokensFactoryOptions<T>
) => MapLeafNodes<T, CSSVarFunction>;

export const createTokensFactory = <T extends Tokens>(
  options: CreateTokensFactoryOptions<T>
): TokensFactory<T> => {
  return () => {
    // const template = mapTokens((path: string[]) => path, options.template());
    // return createThemeContract(template) as MapLeafNodes<T, CSSVarFunction>;
  };
};
