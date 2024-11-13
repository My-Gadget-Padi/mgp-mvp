import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const createVerificationRequest = mutation({
  args: {
    userId: v.id('users'),
    deviceId: v.id('devices'),
    verificationMode: v.string(),
    verificationVideoUrl: v.optional(v.string()),
    verificationVideoStorageId: v.optional(v.id('_storage')),
    proofStorageId: v.id('_storage'),
    proofOfOwnershipUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const deviceId = await ctx.db.insert('verificationRequests', {
      userId: args.userId,
      deviceId: args.deviceId,
      verificationMode: args.verificationMode,
      status: 'pending',
      verificationVideoUrl: args.verificationVideoUrl,
      verificationVideoStorageId: args.verificationVideoStorageId,
      proofOfOwnershipUrl: args.proofOfOwnershipUrl,
      proofStorageId: args.proofStorageId,
    })

    return deviceId
  },
})

export const updateVerificationRequest = mutation({
  args: {
    verificationRequestId: v.id('verificationRequests'),
    adminComments: v.optional(v.string()),
    status: v.string(),
    verifyByAdminId: v.optional(v.id('users')),
    dateVerified: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const verificationRequest = await ctx.db.get(args.verificationRequestId)

    if (!verificationRequest) {
      throw new ConvexError('Verification not found')
    }

    const update = {
      ...(args.adminComments !== undefined && {
        adminComments: args.adminComments,
      }),
      ...(args.status !== undefined && { status: args.status }),
      ...(args.dateVerified !== undefined && {
        dateVerified: args.dateVerified,
      }),
      ...(args.verifyByAdminId !== undefined && {
        verifyByAdminId: args.verifyByAdminId,
      }),
    }

    await ctx.db.patch(args.verificationRequestId, update)

    return args.verificationRequestId
  },
})

export const deleteVerificationRequest = mutation({
  args: {
    verificationRequestId: v.id('verificationRequests'),
  },
  handler: async (ctx, args) => {
    const verificationRequest = await ctx.db.get(args.verificationRequestId)

    if (!verificationRequest) {
      throw new ConvexError('Verification request not found')
    }

    return await ctx.db.delete(args.verificationRequestId)
  },
})

export const getAllVerificationRequests = query({
  handler: async (ctx) => {
    return await ctx.db.query('verificationRequests').order('desc').collect()
  },
})

export const getVerificationRequestById = query({
  args: {
    verificationRequestId: v.id('verificationRequests'),
  },
  handler: async (ctx, args) => {
    const verificationRequest = await ctx.db.get(args.verificationRequestId)

    return verificationRequest
  },
})

export const getVerificationRequestsByStatus = query({
  args: {
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const { status } = args

    const verificationRequests = await ctx.db
      .query('verificationRequests')
      .filter((q) => q.eq(q.field('status'), status))
      .order('desc')
      .collect()

    return verificationRequests
  },
})

export const getVerificationRequestsByMode = query({
  args: {
    verificationMode: v.string(),
  },
  handler: async (ctx, args) => {
    const { verificationMode } = args

    const verificationRequests = await ctx.db
      .query('verificationRequests')
      .filter((q) => q.eq(q.field('verificationMode'), verificationMode))
      .order('desc')
      .collect()

    return verificationRequests
  },
})
