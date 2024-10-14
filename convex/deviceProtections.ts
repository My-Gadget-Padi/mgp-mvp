import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createDeviceProtection = mutation({
  args: {
    userId: v.id("users"),
    phoneNumber: v.number(),
    device: v.id("devices"),
    type: v.string(), //monthly or yearly
    name: v.string(),
    price: v.number()
  },
  handler: async (ctx, args) => {

    const protectionId = await ctx.db.insert("deviceProtections", {
      userId: args.userId,
      phoneNumber: args.phoneNumber,
      type: args.type,
      device: args.device,
      name: args.name,
      price: args.price
    });

    return protectionId;
  },
});

export const updateDeviceProtection = mutation({
  args: {
    protectionId: v.id("deviceProtections"),
    userId: v.optional(v.id("users")),
    phoneNumber: v.optional(v.number()),
    device: v.optional(v.id("devices")),
    type: v.optional(v.string()), //monthly or yearly
    name: v.optional(v.string()),
    price: v.optional(v.number())
  },
  handler: async (ctx, args) => {

    const protection = await ctx.db.get(args.protectionId);

    if (!protection) {
      throw new ConvexError("Device protection not found");
    };

    const updateProtection = {
      ...(args.userId !== undefined && { userId: args.userId }),
      ...(args.price !== undefined && { price: args.price }),
      ...(args.type !== undefined && { type: args.type }),
      ...(args.device !== undefined && { device: args.device }),
      ...(args.name !== undefined && { name: args.name }),
      ...(args.phoneNumber !== undefined && { phoneNumber: args.phoneNumber })
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
    };

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
      .filter(q => q.eq(q.field("userId"), userId))
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
      .filter(q => q.eq(q.field("device"), deviceId))
      .collect();

    return protections;
  },
});