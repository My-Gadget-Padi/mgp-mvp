import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const save = mutation({
  args: {
    email: v.optional(v.string()),
    type: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("tempUsers", {
      email: args.email,
      type: args.type,
      firstName: args.firstName,
      lastName: args.lastName,
      phoneNumber: args.phoneNumber,
    });
  },
});