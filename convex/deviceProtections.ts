import { ConvexError, v } from 'convex/values'
import { action, mutation, query } from './_generated/server'
import { api } from './_generated/api'

export const createDeviceProtection = mutation({
  args: {
    userId: v.id('users'),
    planId: v.id('plans'),
    deviceId: v.optional(v.id('devices')),
    type: v.string(), //monthly or yearly
    name: v.string(),
    amountLeft: v.number(),
    claimsAvailable: v.number(),
  },
  handler: async (ctx, args) => {
    const protectionId = await ctx.db.insert('deviceProtections', {
      userId: args.userId,
      planId: args.planId,
      deviceId: args.deviceId,
      type: args.type,
      name: args.name,
      amountLeft: args.amountLeft,
      claimsAvailable: args.claimsAvailable,
      activationDate: '',
    })

    return protectionId
  },
})

export const updateDeviceProtection = mutation({
  args: {
    protectionId: v.id('deviceProtections'),
    // userId: v.optional(v.id("users")), userId should not be updated
    deviceId: v.optional(v.id('devices')),
    type: v.optional(v.string()),
    name: v.optional(v.string()),
    claimsAvailable: v.optional(v.number()),
    activationDate: v.optional(v.string()),
    expiryDate: v.optional(v.string()),
    amountLeft: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const protection = await ctx.db.get(args.protectionId)

    if (!protection) {
      throw new ConvexError('Device protection not found')
    }

    const updateProtection = {
      ...(args.deviceId !== undefined && { deviceId: args.deviceId }),
      ...(args.amountLeft !== undefined && { amountLeft: args.amountLeft }),
      ...(args.type !== undefined && { type: args.type }),
      ...(args.name !== undefined && { name: args.name }),
      ...(args.activationDate !== undefined && {
        activationDate: args.activationDate,
      }),
      ...(args.expiryDate !== undefined && { expiryDate: args.activationDate }),
      ...(args.claimsAvailable !== undefined && {
        claimsAvailable: args.claimsAvailable,
      }),
    }

    await ctx.db.patch(args.protectionId, updateProtection)

    return args.protectionId
  },
})

export const makeAClaim = action({
  args: {
    protectionId: v.id('deviceProtections'),

    type: v.optional(v.string()),
    name: v.optional(v.string()),
    claimsAvailable: v.optional(v.number()),
    activationDate: v.optional(v.string()),
    expiryDate: v.optional(v.string()),
    amountLeft: v.optional(v.number()),
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
      { protectionId: args.protectionId },
    )

    if (!protection) {
      throw new ConvexError('Device protection not found')
    }
    if (protection.userId !== user._id) {
      throw new ConvexError('User not authorized to use this protection')
    }

    if (!user.paidPlanActivationDate) {
      throw new ConvexError('You are not eligible to make a claim')
    }

    if (!protection.claimsAvailable) {
      throw new ConvexError('You do not have any claims left')
    }

    // Check if user has activated a plan for more than 30 days
    const currentDate = new Date()
    const paidPlanActivationDate = new Date(user.paidPlanActivationDate)

    const timeDifference =
      currentDate.getTime() - paidPlanActivationDate.getTime()

    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

    if (daysDifference < 30) {
      throw new ConvexError(
        'You can only make a claim 30 days after activating your first protection plan',
      )
    }

    // @TODO reduce the claims available and amount  after redeeming claim

    return args.protectionId
  },
})

export const deleteDeviceProtection = mutation({
  args: {
    protectionId: v.id('deviceProtections'),
  },
  handler: async (ctx, args) => {
    const protection = await ctx.db.get(args.protectionId)

    if (!protection) {
      throw new ConvexError('Device protection not found')
    }

    return await ctx.db.delete(args.protectionId)
  },
})

export const getAllDeviceProtections = query({
  handler: async (ctx) => {
    return await ctx.db.query('deviceProtections').order('desc').collect()
  },
})

export const getDeviceProtectionsById = query({
  args: {
    protectionId: v.id('deviceProtections'),
  },
  handler: async (ctx, args) => {
    const protection = await ctx.db.get(args.protectionId)

    return protection
  },
})

export const getDeviceProtectionsByUserId = query({
  args: {
    userId: v.optional(v.id('users')),
  },
  handler: async (ctx, args) => {
    const { userId } = args

    const protections = await ctx.db
      .query('deviceProtections')
      .filter((q) => q.eq(q.field('userId'), userId))
      .collect()

    return protections
  },
})

export const getDeviceProtectionsByDeviceId = query({
  args: {
    deviceId: v.optional(v.id('devices')),
  },
  handler: async (ctx, args) => {
    const { deviceId } = args

    const protections = await ctx.db
      .query('deviceProtections')
      .filter((q) => q.eq(q.field('deviceId'), deviceId))
      .collect()

    return protections
  },
})

export const getUserFreePlan = query({
  args: {
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    const plan = await ctx.db
      .query('deviceProtections')
      .filter((q) =>
        q.and(
          q.eq(q.field('userId'), args.userId),
          q.eq(q.field('name'), 'Free Plan'),
        ),
      )
      .unique()

    return plan
  },
})
