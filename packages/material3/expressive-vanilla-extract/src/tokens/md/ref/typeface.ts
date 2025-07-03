import { defineToken, defineTokenSet } from "../../../utils";

export type Tokens = {
  plain: string;
};

export default defineTokenSet({
  tokens: ({ group }) => ({
    plain: group(),
  }),
});
