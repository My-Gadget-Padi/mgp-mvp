import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createDevice = mutation({
  args: {
    userId: v.id("users"),
    phoneNumber: v.number(),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    name: v.string(),
    model: v.string(),
    serialNumber: v.number(),
    protection: v.optional(v.id("deviceProtections"))
  },
  handler: async (ctx, args) => {

    const deviceId = await ctx.db.insert("devices", {
      userId: args.userId,
      phoneNumber: args.phoneNumber,
      imageUrl: args.imageUrl,
      imageStorageId: args.imageStorageId,
      serialNumber: args.serialNumber,
      protection: args.protection,
      name: args.name,
      model: args.model
    });

    return deviceId;
  },
});

export const updateDevice = mutation({
  args: {
    deviceId: v.id("devices"),
    userId: v.optional(v.id("users")),
    phoneNumber: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    protection: v.optional(v.id("deviceProtections")),
    serialNumber: v.optional(v.number()),
    name: v.optional(v.string()),
    model: v.optional(v.string())
  },
  handler: async (ctx, args) => {

    const device = await ctx.db.get(args.deviceId);

    if (!device) {
      throw new ConvexError("Device not found");
    };

    const updateDeviceInfo = {
      ...(args.userId !== undefined && { userId: args.userId }),
      ...(args.phoneNumber !== undefined && { phoneNumber: args.phoneNumber }),
      ...(args.imageUrl !== undefined && { imageUrl: args.imageUrl }),
      ...(args.imageStorageId !== undefined && { imageStorageId: args.imageStorageId }),
      ...(args.protection !== undefined && { protection: args.protection }),
      ...(args.serialNumber !== undefined && { serialNumber: args.serialNumber }),
      ...(args.name !== undefined && { name: args.name }),
      ...(args.model !== undefined && { model: args.model })
    };

    await ctx.db.patch(args.deviceId, updateDeviceInfo);

    return args.deviceId;
  },
});

export const deleteDevice = mutation({
  args: {
    deviceId: v.id("devices"),
  },
  handler: async (ctx, args) => {
    const device = await ctx.db.get(args.deviceId);

    if (!device) {
      throw new ConvexError("Device not found");
    };

    return await ctx.db.delete(args.deviceId);
  },
});

export const getAllDevices = query({
  handler: async (ctx) => {
    return await ctx.db.query("devices").order("desc").collect();
  },
});

export const getDeviceById = query({
  args: {
    deviceId: v.id("devices"),
  },
  handler: async (ctx, args) => {
    const device = await ctx.db.get(args.deviceId);

    return device;
  },
});

export const getDevicesByUserId = query({
  args: {
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const { userId } = args;

    const devices = await ctx.db
      .query("devices")
      .filter(q => q.eq(q.field("userId"), userId))
      .collect();

    return devices;
  },
});

export const getDevicesByDeviceProtectionId = query({
  args: {
    protectionId: v.optional(v.id("deviceProtections")),
  },
  handler: async (ctx, args) => {
    const { protectionId } = args;

    const devices = await ctx.db
      .query("devices")
      .filter(q => q.eq(q.field("protection"), protectionId))
      .collect();

    return devices;
  },
});

// this mutation is required to generate the url after uploading the phone/device image to the storage.
export const getUrl = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});