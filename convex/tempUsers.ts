import { v } from 'convex/values'
import { mutation } from './_generated/server'

export const save = mutation({
  args: {
    email: v.optional(v.string()),
    type: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    role: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const temp = {
      email: args.email,
      type: args.type,
      firstName: args.firstName,
      lastName: args.lastName,
      phoneNumber: args.phoneNumber,
      role: args.role,
    }

    // Check if user is admin an can set role
    const identity = await ctx.auth.getUserIdentity()

    if (identity) {
      const user = await ctx.db
        .query('users')
        .filter((q) => q.eq(q.field('email'), identity.email))
        .unique()
      if (user?.role === 'super') {
        temp.role = args.role
      }
    }

    await ctx.db.insert('tempUsers', temp)
  },
})
