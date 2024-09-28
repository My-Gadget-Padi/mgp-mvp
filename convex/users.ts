import { ConvexError, v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

export const getAllUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").order("desc").collect();
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  },
});

export const getUserByConvexId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  }
});

export const getUsersByPlainIds = query({
  args: { userIds: v.array(v.string()) },
  handler: async (ctx, args) => {
    const { userIds } = args;

    if (userIds.length === 0) {
      return [];
    }

    // Collect all users by their IDs
    const users = [];
    for (const userId of userIds) {
      const user = await ctx.db.query("users").filter(q => q.eq(q.field("_id"), userId)).unique();
      if (user) {
        users.push(user);
      }
    }

    return users;
  },
});

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    type: v.optional(v.string()), //customer or technician
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    address: v.optional(v.string()),
    phoneNumber: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    notificationType: v.optional(v.string()), // email or SMS
    notifications: v.optional(v.id("notifications")),
    stripeId: v.optional(v.string()),
    paystackId: v.optional(v.string()),
    requests: v.optional(v.array(v.id("repairRequests"))),
    protection: v.optional(v.id("deviceProtections")),
    isAdmin: v.optional(v.boolean()),
    secretCode: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    try {
      const newUserId = await ctx.db.insert("users", {
        clerkId: args.clerkId,
        email: args.email,
        type: args.type || "customer",
        firstName: args.firstName || "",
        lastName: args.lastName || "",
        address: args.address || "",
        phoneNumber: args.phoneNumber || 0,
        imageUrl: args.imageUrl,
        imageStorageId: args.imageStorageId,
        notificationType: args.notificationType || "email",
        notifications: args.notifications,
        stripeId: args.stripeId || "",
        paystackId: args.paystackId || "",
        requests: args.requests || [],
        protection: args.protection,
        isAdmin: false,
        secretCode: ""
      });
      const updatedUser = await ctx.db.get(newUserId);

      return updatedUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new ConvexError("Failed to create user.");
    }
  }
});

export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    email: v.optional(v.string()),
    type: v.optional(v.string()), //customer or technician
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    address: v.optional(v.string()),
    phoneNumber: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    notificationType: v.optional(v.string()), // email or SMS
    notifications: v.optional(v.id("notifications")),
    stripeId: v.optional(v.string()),
    paystackId: v.optional(v.string()),
    requests: v.optional(v.array(v.id("repairRequests"))),
    protection: v.optional(v.id("deviceProtections"))
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const updateFields = {
      ...(args.imageUrl !== undefined && { imageUrl: args.imageUrl }),
      ...(args.imageStorageId !== undefined && { imageStorageId: args.imageStorageId }),
      ...(args.notificationType !== undefined && { notificationType: args.notificationType }),
      ...(args.notifications !== undefined && { notifications: args.notifications }),
      ...(args.email !== undefined && { email: args.email }),
      ...(args.phoneNumber !== undefined && { phoneNumber: args.phoneNumber }),
      ...(args.firstName !== undefined && { firstName: args.firstName }),
      ...(args.lastName !== undefined && { lastName: args.lastName }),
      ...(args.type !== undefined && { type: args.type }),
      ...(args.stripeId !== undefined && { stripeId: args.stripeId }),
      ...(args.paystackId !== undefined && { paystackId: args.paystackId }),
      ...(args.address !== undefined && { address: args.address }),
      ...(args.requests !== undefined && { requests: args.requests }),
      ...(args.protection !== undefined && { protection: args.protection })
    };

    await ctx.db.patch(args.userId, updateFields);
    return args.userId;
  },
});

export const deleteUser = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (!user) {
      throw new ConvexError("User not found");
    }

    return await ctx.db.delete(args.userId);
  },
});

export const getUrl = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const updateClerkUser = internalMutation({
  args: {
    clerkId: v.string(),
    imageUrl: v.optional(v.string()),
    email: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    stripeId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const updateFields = {
      ...(args.clerkId !== undefined && { clerkId: args.clerkId }),
      ...(args.imageUrl !== undefined && { imageUrl: args.imageUrl }),
      ...(args.email !== undefined && { email: args.email }),
      ...(args.firstName !== undefined && { firstName: args.firstName }),
      ...(args.lastName !== undefined && { lastName: args.lastName }),
      ...(args.stripeId !== undefined && { stripeId: args.stripeId })
    };

    await ctx.db.patch(user._id, updateFields);
    return user._id;
  },
});

export const deleteClerkUser = internalMutation({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.delete(user._id);
  },
});