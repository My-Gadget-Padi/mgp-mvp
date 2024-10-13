import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const logout = mutation({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const { sessionId } = args;

    const session = await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("sessionId"), sessionId))
      .unique();

    if (!session) {
      return { message: "Logged out" };
    }

    return await ctx.db.delete(session._id);
  },
});

export const validateSession = mutation({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const { sessionId } = args;

    try {
      const session = await ctx.db
        .query("sessions")
        .filter((q) => q.eq(q.field("sessionId"), sessionId))
        .unique();

      if (!session) {
        throw new ConvexError("Invalid session.");
      }

      if (new Date(session.expiresAt) <= new Date()) {
        await ctx.db.delete(session._id);
        throw new ConvexError("Session expired!");
      }

      const user = await ctx.db.get(session.userId);
      return { user };
    } catch (error) {
      console.error("Error validating session:", error);
      throw new ConvexError("Session validation failed.");
    }
  },
});
