import { ConvexError, v } from 'convex/values'
import { action, mutation, query } from './_generated/server'
import { api } from './_generated/api'

export const onboardDeviceToProtection = action({
  args: {
    protection: v.id('deviceProtections'),
    type: v.string(),
    brand: v.string(),
    model: v.string(),
    condition: v.string(),
    serialNumber: v.string(),

    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id('_storage')),
    proofOfOwnershipUrl: v.optional(v.string()),
    proofStorageId: v.optional(v.id('_storage')),
    verificationMode: v.optional(v.string()), // video, call or physical
    verificationVideoUrl: v.optional(v.string()),
    verificationVideoStorageId: v.optional(v.id('_storage')),
  },
  handler: async (ctx, args) => {
    const response: any = { status: true }
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new ConvexError('User not authenticated')
    }
    const user = await ctx.runQuery(api.users.getUserByEmail, {
      email: identity.email!,
    })
    if (!identity) {
      throw new ConvexError('User not found')
    }

    const protection = await ctx.runQuery(
      api.deviceProtections.getDeviceProtectionsById,
      { protectionId: args.protection },
    )
    if (!protection) {
      throw new ConvexError('Protection not found')
    }
    if (protection.userId !== user._id) {
      throw new ConvexError('User not authorized to use this protection')
    }

    const plan = await ctx.runQuery(api.plans.getPlanById, {
      planId: protection.planId,
    })
    if (!plan) {
      throw new ConvexError('Plan not found')
    }

    const durationMilliseconds = plan.durationMonths * 30 * 24 * 60 * 60 * 1000
    const currentDate = new Date()
    const expiryDate = new Date(
      currentDate.getMilliseconds() + durationMilliseconds,
    )

    const device: any = {
      userId: user._id,
      proofOfOwnershipUrl: args.proofOfOwnershipUrl,
      proofStorageId: args.proofStorageId,
      brand: args.brand,
      type: args.type,
      model: args.model,
      serialNumber: args.serialNumber,
      condition: args.condition,
      protection: args.protection,
      verified: false,
    }

    if (args.verificationMode === 'video') {
      if (!args.verificationVideoStorageId || !args.verificationVideoUrl) {
        throw new ConvexError('Video upload required to verify')
      }

      device.verificationVideoStorageId = args.verificationVideoStorageId
      device.verificationVideoUrl = args.verificationVideoUrl
    } else {
      // create verification request
    }

    const deviceId = ctx.runMutation(api.devices.createDevice, device)
    if (!deviceId) {
      throw new ConvexError('Failed to create device')
    }
    response.deviceId = deviceId

    await ctx.runMutation(api.deviceProtections.updateDeviceProtection, {
      protectionId: protection._id,
      amountLeft: plan.maxRedemptionAmount,
      claimsAvailable: plan.claimLimit,
      activationDate: currentDate.toDateString(),
      expiryDate: expiryDate.toDateString(),
    })

    return response
  },
})

export const onboardDevice = mutation({
  args: {
    protection: v.id('deviceProtections'),
    planName: v.string(),
    type: v.string(),
    brand: v.string(),
    model: v.string(),
    condition: v.string(),
    serialNumber: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .collect();
    
    if (user.length === 0) {
      throw new ConvexError("User not found");
    }

    const deviceId = await ctx.db.insert('devices', {
      userId: user[0]?._id,
      protection: args.protection,
      planName: args.planName,
      type: args.type,
      brand: args.brand,
      model: args.model,
      condition: args.condition,
      serialNumber: args.serialNumber,
      verified: false
    });

    const deviceProtection = await ctx.db
    .query("deviceProtections")
    .filter((q) => q.eq(q.field("_id"), args.protection))
    .unique();

    if (!deviceProtection) {
      throw new ConvexError("Device protection not found");
    }

    const planId = deviceProtection.planId

    const plan = await ctx.db
    .query("plans")
    .filter((q) => q.eq(q.field("_id"), planId))
    .unique();

    if (!plan) {
      throw new ConvexError("Plan not found");
    }

    return {
      deviceId,
      plan
    };
  },
})

export const deviceVerification = mutation({
  args: {
    deviceId: v.id('devices'),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id('_storage')),
    protection: v.optional(v.id('deviceProtections')),
    serialNumber: v.optional(v.string()),
    brand: v.optional(v.string()),
    type: v.optional(v.string()),
    model: v.optional(v.string()),
    condition: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const device = await ctx.db.get(args.deviceId)

    if (!device) {
      throw new ConvexError('Device not found')
    }

    const updateDeviceInfo = {
      ...(args.type !== undefined && { type: args.type }),
      ...(args.condition !== undefined && { condition: args.condition }),
      ...(args.imageUrl !== undefined && { imageUrl: args.imageUrl }),
      ...(args.imageStorageId !== undefined && {
        imageStorageId: args.imageStorageId,
      }),
      ...(args.protection !== undefined && { protection: args.protection }),
      ...(args.serialNumber !== undefined && {
        serialNumber: args.serialNumber,
      }),
      ...(args.brand !== undefined && { brand: args.brand }),
      ...(args.model !== undefined && { model: args.model }),
    }

    await ctx.db.patch(args.deviceId, updateDeviceInfo)

    return args.deviceId
  },
})

export const createDevice = mutation({
  args: {
    userId: v.id('users'),
    condition: v.string(),
    type: v.string(),
    planName: v.string(),
    proofStorageId: v.id('_storage'),
    proofOfOwnershipUrl: v.string(),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id('_storage')),
    brand: v.string(),
    model: v.string(),
    verified: v.boolean(),
    serialNumber: v.string(),
    protection: v.id('deviceProtections'),
    verificationVideoUrl: v.optional(v.string()),
    verificationVideoStorageId: v.optional(v.id('_storage')),
  },
  handler: async (ctx, args) => {
    const deviceId = await ctx.db.insert('devices', {
      userId: args.userId,
      proofOfOwnershipUrl: args.proofOfOwnershipUrl,
      proofStorageId: args.proofStorageId,
      type: args.type,
      planName: args.planName,
      condition: args.condition,
      imageUrl: args.imageUrl,
      imageStorageId: args.imageStorageId,
      serialNumber: args.serialNumber,
      protection: args.protection,
      brand: args.brand,
      verified: args.verified,
      model: args.model,
      verificationVideoUrl: args.verificationVideoUrl,
      verificationVideoStorageId: args.verificationVideoStorageId,
    })

    return deviceId
  },
})

export const updateDevice = mutation({
  args: {
    deviceId: v.id('devices'),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id('_storage')),
    protection: v.optional(v.id('deviceProtections')),
    serialNumber: v.optional(v.string()),
    brand: v.optional(v.string()),
    type: v.optional(v.string()),
    model: v.optional(v.string()),
    condition: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const device = await ctx.db.get(args.deviceId)

    if (!device) {
      throw new ConvexError('Device not found')
    }

    const updateDeviceInfo = {
      ...(args.type !== undefined && { type: args.type }),
      ...(args.condition !== undefined && { condition: args.condition }),
      ...(args.imageUrl !== undefined && { imageUrl: args.imageUrl }),
      ...(args.imageStorageId !== undefined && {
        imageStorageId: args.imageStorageId,
      }),
      ...(args.protection !== undefined && { protection: args.protection }),
      ...(args.serialNumber !== undefined && {
        serialNumber: args.serialNumber,
      }),
      ...(args.brand !== undefined && { brand: args.brand }),
      ...(args.model !== undefined && { model: args.model }),
    }

    await ctx.db.patch(args.deviceId, updateDeviceInfo)

    return args.deviceId
  },
})

export const deleteDevice = mutation({
  args: {
    deviceId: v.id('devices'),
  },
  handler: async (ctx, args) => {
    const device = await ctx.db.get(args.deviceId)

    if (!device) {
      throw new ConvexError('Device not found')
    }

    return await ctx.db.delete(args.deviceId)
  },
})

export const getAllDevices = query({
  handler: async (ctx) => {
    return await ctx.db.query('devices').order('desc').collect()
  },
})

export const getDeviceById = query({
  args: {
    deviceId: v.id('devices'),
  },
  handler: async (ctx, args) => {
    const device = await ctx.db.get(args.deviceId)

    return device
  },
})

export const getDevicesByUserId = query({
  args: {
    userId: v.optional(v.id('users')),
  },
  handler: async (ctx, args) => {
    const { userId } = args

    const devices = await ctx.db
      .query('devices')
      .filter((q) => q.eq(q.field('userId'), userId))
      .collect()

    return devices
  },
})

export const getDevicesByDeviceProtectionId = query({
  args: {
    protectionId: v.optional(v.id('deviceProtections')),
  },
  handler: async (ctx, args) => {
    const { protectionId } = args

    const devices = await ctx.db
      .query('devices')
      .filter((q) => q.eq(q.field('protection'), protectionId))
      .collect()

    return devices
  },
})

// this mutation is required to generate the url after uploading the phone/device image to the storage.
export const getUrl = mutation({
  args: {
    storageId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId)
  },
})
