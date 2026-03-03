import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const sayHello = query({
  args: {
    name: v.string(),
  },
  handler: async (ctx, { name }) => {
    return `Hello, ${name}!`;
  },
});