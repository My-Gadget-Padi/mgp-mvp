import { ConvexError, v } from 'convex/values'
import { action, mutation, query } from './_generated/server'
import { api, internal } from './_generated/api'

export const buyPlan = action({
  args: {
    planId: v.id('plans'),
  },
  handler: async (ctx, args) => {
    try {
      const response: any = { status: true }
      const { planId } = args
      const identity = await ctx.auth.getUserIdentity()

      if (!identity) {
        throw new ConvexError('User not authenticated')
      }

      const plan = await ctx.runQuery(api.plans.getPlanById, { planId: planId })
      if (!plan) {
        throw new ConvexError('Plan not found')
      }

      const user = await ctx.runQuery(api.users.getUserByEmail, {
        email: identity.email!,
      })

      if (plan.name === 'Free Plan') {
        const existingFreePlan = await ctx.runQuery(
          api.deviceProtections.getUserFreePlan,
          { userId: user._id },
        )
        if (existingFreePlan || user.hasFreePlan) {
          throw new ConvexError('You have already have a free plan')
        }
        await ctx.runMutation(api.deviceProtections.createDeviceProtection, {
          userId: user._id,
          planId,
          type: plan.type,
          name: plan.name,
          amountLeft: plan.maxRedemptionAmount,
          claimsAvailable: plan.claimLimit,
        })
        
        await ctx.runMutation(api.users.updateUser, {userId: user._id, hasFreePlan: true})
      } else {
        const authorizationUrl: string = await ctx.runAction(
          internal.paystack.initializePayment,
          {
            amount: plan.price,
            email: user.email,
            userId: user._id,
            description: `Payment for ${plan.name} protection plan`,
            planId,
          },
        )
        if (!authorizationUrl) {
          throw new ConvexError('Failed to get authorization URL!')
        }
        response.authorizationUrl = authorizationUrl
      }

      return response
    } catch (error) {
      console.error(`Failed initialize plan purchase: ${error}`)
      throw new ConvexError(`Failed initialize plan purchase: ${error}`)
    }
  },
})

export const createPlan = mutation({
  args: {
    name: v.string(),
    type: v.string(),
    durationMonths: v.number(),
    maxRedemptionAmount: v.number(),
    claimLimit: v.number(),
    price: v.number(),
    details: v.object({
      benefits: v.array(v.string()),
      terms: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const planId = await ctx.db.insert('plans', {
      name: args.name,
      type: args.type,
      durationMonths: args.durationMonths,
      maxRedemptionAmount: args.maxRedemptionAmount,
      claimLimit: args.claimLimit,
      price: args.price,
      details: args.details,
    })

    return planId
  },
})

export const updatePlan = mutation({
  args: {
    planId: v.id('plans'),
    name: v.string(),
    type: v.string(), //monthly or yearly
    durationMonths: v.number(),
    maxRedemptionAmount: v.number(),
    claimLimit: v.number(), // number of redeemable claims
    price: v.number(),
    details: v.object({
      benefits: v.array(v.string()),
      terms: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const plan = await ctx.db.get(args.planId)

    if (!plan) {
      throw new ConvexError('Plan not found')
    }

    const updatePlan = {
      ...(args.name !== undefined && { name: args.name }),
      ...(args.type !== undefined && { type: args.type }),
      ...(args.durationMonths !== undefined && {
        durationMonths: args.durationMonths,
      }),
      ...(args.maxRedemptionAmount !== undefined && {
        maxRedemptionAmount: args.durationMonths,
      }),
      ...(args.claimLimit !== undefined && { claimLimit: args.durationMonths }),
      ...(args.price !== undefined && { price: args.price }),
      ...(args.details !== undefined && { details: args.details }),
    }

    await ctx.db.patch(args.planId, updatePlan)

    return args.planId
  },
})

export const deletePlan = mutation({
  args: {
    planId: v.id('plans'),
  },
  handler: async (ctx, args) => {
    const plan = await ctx.db.get(args.planId)

    if (!plan) {
      throw new ConvexError('Plan not found')
    }

    return await ctx.db.delete(args.planId)
  },
})

export const getAllPlans = query({
  handler: async (ctx) => {
    return await ctx.db.query('plans').order('desc').collect()
  },
})

export const getPlanById = query({
  args: {
    planId: v.id('plans'),
  },
  handler: async (ctx, args) => {
    const plan = await ctx.db.get(args.planId)

    return plan
  },
});

export const getPlanByName = query({
  args: {
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { name } = args;

    const plan = await ctx.db
      .query("plans")
      .filter((q) => q.eq(q.field("name"), name))
      .unique();

    return plan;
  },
});