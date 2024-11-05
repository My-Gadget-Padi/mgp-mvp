import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createDeviceProtection = mutation({
  args: {
    userId: v.id("users"),
    planId: v.id("plans"),
    deviceId: v.optional(v.id("devices")),
    type: v.string(), //monthly or yearly
    name: v.string(),
    amountLeft: v.number(),
    claimsAvailable: v.number(),
  },
  handler: async (ctx, args) => {
    const protectionId = await ctx.db.insert("deviceProtections", {
      userId: args.userId,
      planId: args.planId,
      deviceId: args.deviceId,
      type: args.type,
      name: args.name,
      amountLeft: args.amountLeft,
      claimsAvailable: args.claimsAvailable,
    });

    return protectionId;
  },
});

export const updateDeviceProtection = mutation({
  args: {
    protectionId: v.id("deviceProtections"),
    userId: v.optional(v.id("users")),
    deviceId: v.optional(v.id("devices")),
    type: v.optional(v.string()), //monthly or yearly
    name: v.optional(v.string()),
    amountLeft: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const protection = await ctx.db.get(args.protectionId);

    if (!protection) {
      throw new ConvexError("Device protection not found");
    }

    const updateProtection = {
      ...(args.userId !== undefined && { userId: args.userId }),
      ...(args.amountLeft !== undefined && { amountLeft: args.amountLeft }),
      ...(args.type !== undefined && { type: args.type }),
      ...(args.deviceId !== undefined && { deviceId: args.deviceId }),
      ...(args.name !== undefined && { name: args.name }),
    };

    await ctx.db.patch(args.protectionId, updateProtection);

    return args.protectionId;
  },
});

export const deleteDeviceProtection = mutation({
  args: {
    protectionId: v.id("deviceProtections"),
  },
  handler: async (ctx, args) => {
    const protection = await ctx.db.get(args.protectionId);

    if (!protection) {
      throw new ConvexError("Device protection not found");
    }

    return await ctx.db.delete(args.protectionId);
  },
});

export const getAllDeviceProtections = query({
  handler: async (ctx) => {
    return await ctx.db.query("deviceProtections").order("desc").collect();
  },
});

export const getDeviceProtectionsById = query({
  args: {
    protectionId: v.id("deviceProtections"),
  },
  handler: async (ctx, args) => {
    const protection = await ctx.db.get(args.protectionId);

    return protection;
  },
});

export const getDeviceProtectionsByUserId = query({
  args: {
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const { userId } = args;

    const protections = await ctx.db
      .query("deviceProtections")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    return protections;
  },
});

export const getDeviceProtectionsByDeviceId = query({
  args: {
    deviceId: v.optional(v.id("devices")),
  },
  handler: async (ctx, args) => {
    const { deviceId } = args;

    const protections = await ctx.db
      .query("deviceProtections")
      .filter((q) => q.eq(q.field("deviceId"), deviceId))
      .collect();

    return protections;
  },
});

export const getUserFreePlan = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const plan = await ctx.db
      .query("deviceProtections")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .unique();

    return plan;
  },
});
