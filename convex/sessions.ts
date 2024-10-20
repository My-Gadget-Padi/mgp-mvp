import { internalMutation, mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createSession = internalMutation({
  args: { userId: v.id("users"), sessionId: v.string(), userAgent: v.any() },
  handler: async (ctx, args) => {
    const { userId, sessionId, userAgent } = args;

    const os = userAgent?.os?.name;
    const browser = userAgent?.browser?.name;
    const device = userAgent?.device?.model;

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    await ctx.db.insert("sessions", {
      userId,
      sessionId,
      expiresAt,
      os,
      browser,
      device,
    });

    return sessionId;
  },
});

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
        throw new ConvexError("Session expired!.");
      }

      if (new Date(session.expiresAt) <= new Date()) {
        await ctx.db.delete(session._id);
        throw new ConvexError("Session expired!");
      }

      const user = await ctx.db.get(session.userId);
      if (!user) {
        throw new ConvexError("Session expired!");
      }

      return { user };
    } catch (error) {
      console.error("Error validating session:", error);
      throw new ConvexError("Session expired!.");
    }
  },
});
