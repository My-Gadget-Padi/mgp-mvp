'use node'

import { ConvexError, v } from 'convex/values'
import { action, internalAction } from './_generated/server'
import { Paystack } from 'paystack-sdk'
import { api, internal } from './_generated/api'

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!)
export const initializePayment = internalAction({
  args: {
    amount: v.number(),
    email: v.string(),
    userId: v.id('users'),
    planId: v.optional(v.id('plans')),
    repairRequestId: v.optional(v.id('repairRequests')),
    description: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { amount, email, userId, planId, repairRequestId, description },
  ) => {
    const reference = `mgp-${Date.now()}-${Math.floor(Math.random() * 9999999)}`
    const amountString = String(amount * 100)

    const response = await paystack.transaction.initialize({
      amount: amountString,
      email,
      currency: 'NGN',
      reference,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/protection/payment/callback`,
    })

    if (!response.status || !response.data) {
      throw new ConvexError(`Failed to create payment!`)
    }

    await ctx.runMutation(internal.payments.createPayment, {
      userId,
      planId,
      repairRequestId,
      amount,
      initialConfig: response.data,
      paymentLink: response.data?.authorization_url,
      reference,
      status: 'pending',
      description,
    })

    return response.data.authorization_url
  },
})

export const verifyPayment = action({
  args: { reference: v.string() },
  handler: async (ctx, { reference }) => {
    const responseContent: any = { status: true }

    const payment = await ctx.runQuery(api.payments.getPaymentByReference, {
      reference,
    })
    if (payment.status === 'completed') {
      responseContent.message = 'Payment already completed'
      return responseContent
    }

    const response = await paystack.transaction.verify(reference)

    if (
      !response.status ||
      !response.data ||
      response.data.status !== 'success'
    ) {
      throw new ConvexError(
        `Unable to verify payment!\n ${response.status} ${response.data?.status}`,
      )
    }

    if (response.data.amount / 100 !== payment.amount) {
      throw new ConvexError(`Payment amount mismatch!`)
    }

    const planId = payment.planId
    if (planId) {
      const plan = await ctx.runQuery(api.plans.getPlanById, { planId })

      if (!plan) {
        throw new ConvexError(`Plan not found!`)
      }

      await ctx.runMutation(api.deviceProtections.createDeviceProtection, {
        userId: payment.userId,
        planId,
        type: plan.type,
        name: plan.name,
        amountLeft: plan.maxRedemptionAmount,
        claimsAvailable: plan.claimLimit,
      })

      const currentDate = new Date()
      await ctx.runMutation(internal.payments.updatePayment, {
        paymentId: payment._id,
        status: 'completed',
        finalConfig: response.data,
        paidAt: currentDate.toISOString(),
      })
    } else if (payment.repairRequestId) {
      //Update repairRequest to paid
    }

    return responseContent
  },
})
