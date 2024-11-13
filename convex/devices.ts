import { ConvexError, v } from 'convex/values'
import { action, mutation, query } from './_generated/server'
import { api } from './_generated/api'

export const onboardDeviceToProtection = action({
  args: {
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id('_storage')),
    proofOfOwnershipUrl: v.string(),
    proofStorageId: v.id('_storage'),
    name: v.string(),
    type: v.string(),
    model: v.string(),
    serialNumber: v.number(),
    condition: v.string(),
    protection: v.id('deviceProtections'),
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
    if (!user) {
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
      name: args.name,
      type: args.type,
      model: args.model,
      serialNumber: args.serialNumber,
      condition: args.condition,
      protection: args.protection,
      verified: false,
    }

    if (args.verificationMode) {
      // create verification request
      if (args.verificationMode === 'video') {
        if (!args.verificationVideoStorageId || !args.verificationVideoUrl) {
          throw new ConvexError('Video upload required to verify')
        }
      }

      //send email to admin
      device.verificationVideoStorageId = args.verificationVideoStorageId
      device.verificationVideoUrl = args.verificationVideoUrl
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

export const createDevice = mutation({
  args: {
    userId: v.id('users'),
    condition: v.string(),
    type: v.string(),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id('_storage')),
    name: v.string(),
    model: v.string(),
    serialNumber: v.number(),
    protection: v.optional(v.id('deviceProtections')),
    verificationVideoUrl: v.optional(v.string()),
    verificationVideoStorageId: v.optional(v.id('_storage')),
  },
  handler: async (ctx, args) => {
    const deviceId = await ctx.db.insert('devices', {
      userId: args.userId,
      type: args.type,
      condition: args.condition,
      imageUrl: args.imageUrl,
      imageStorageId: args.imageStorageId,
      serialNumber: args.serialNumber,
      protection: args.protection,
      name: args.name,
      isVerified: false,
      model: args.model,
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
    serialNumber: v.optional(v.number()),
    name: v.optional(v.string()),
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
      ...(args.name !== undefined && { name: args.name }),
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
