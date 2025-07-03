import type { defineTokenSet } from "../../../utils";

export default defineTokenSet({
  tokens: ({ group }) => ({
    duration: group({}),
  }),
});
