import * as md from "./md";

export { md };

export const applyTextStyle = (tokens: md.sys.typescale.Token<string>) => {
  return md.sys.typescale.cssFromTypescale(tokens);
};
