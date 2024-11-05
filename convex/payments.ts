import { ConvexError, v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

export const createPayment = internalMutation({
  args: {
    userId: v.id("users"),
    planId: v.optional(v.id("plans")),
    repairRequestId: v.optional(v.id("repairRequests")),
    amount: v.number(),
    status: v.string(),
    paymentLink: v.string(),
    reference: v.string(),
    description: v.optional(v.string()),
    initialConfig: v.any(),
    finalConfig: v.optional(v.any()),
    paidAt: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const paymentId = await ctx.db.insert("payments", {
      userId: args.userId,
      planId: args.planId,
      repairRequestId: args.repairRequestId,
      amount: args.amount,
      status: args.status,
      paymentLink: args.paymentLink,
      reference: args.reference,
      description: args.description,
      initialConfig: args.initialConfig,
      finalConfig: args.finalConfig,
      paidAt: args.reference,
    });

    return paymentId;
  },
});

export const updatePayment = internalMutation({
  args: {
    paymentId: v.id("payments"),
    status: v.string(),
    finalConfig: v.optional(v.any()),
    paidAt: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const payment = await ctx.db.get(args.paymentId);

    if (!payment) {
      throw new ConvexError("Payment not found");
    }

    const updatePaymentInfo = {
      ...(args.description !== undefined && { description: args.description }),
      ...(args.status !== undefined && { status: args.status }),
      ...(args.finalConfig !== undefined && { finalConfig: args.finalConfig }),
      ...(args.paidAt !== undefined && { paidAt: args.paidAt }),
      ...(args.description !== undefined && { description: args.description }),
    };

    await ctx.db.patch(args.paymentId, updatePaymentInfo);

    return args.paymentId;
  },
});

export const deletePayment = mutation({
  args: {
    paymentId: v.id("payments"),
  },
  handler: async (ctx, args) => {
    const payment = await ctx.db.get(args.paymentId);

    if (!payment) {
      throw new ConvexError("Payment not found");
    }

    return await ctx.db.delete(args.paymentId);
  },
});

export const getAllPayments = query({
  handler: async (ctx) => {
    return await ctx.db.query("payments").order("desc").collect();
  },
});

export const getPaymentById = query({
  args: {
    paymentId: v.id("payments"),
  },
  handler: async (ctx, args) => {
    const payment = await ctx.db.get(args.paymentId);

    return payment;
  },
});

export const getPaymentsByUserId = query({
  args: {
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const { userId } = args;

    const payments = await ctx.db
      .query("payments")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    return payments;
  },
});

export const getPaymentByReference = query({
  args: { reference: v.string() },
  handler: async (ctx, args) => {
    const payment = await ctx.db
      .query("payments")
      .filter((q) => q.eq(q.field("reference"), args.reference))
      .unique();

    if (!payment) {
      throw new ConvexError("Payment not found");
    }

    return payment;
  },
});
