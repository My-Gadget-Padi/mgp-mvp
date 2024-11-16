import { ConvexError, v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const getAllUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").order("desc").collect();
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.optional(v.string()) },
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
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .unique();

      if (!user) {
        throw new ConvexError("User not found");
      }  

    return user;
  },
});

// export const getUsersByPlainIds = query({
//   args: { userIds: v.array(v.string()) },
//   handler: async (ctx, args) => {
//     const { userIds } = args;

//     if (userIds.length === 0) {
//       return [];
//     }

//     // Collect all users by their IDs
//     const users = [];
//     for (const userId of userIds) {
//       const user = await ctx.db.query("users").filter(q => q.eq(q.field("_id"), userId)).unique();
//       if (user) {
//         users.push(user);
//       }
//     }

//     return users;
//   },
// });

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    type: v.optional(v.string()), //customer or technician
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    address: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    role: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    notificationMethod: v.optional(v.string()), // email, sms, whatsapp, call
    notificationType: v.optional(v.string()), // all, repairs only, none
    communication_updates: v.optional(v.boolean()), // true or false : default = true
    marketing_updates: v.optional(v.boolean()), // true or false
    social_updates: v.optional(v.boolean()), // true or false
    security_updates: v.optional(v.boolean()), // true or false : default = true
    stripeId: v.optional(v.string()),
    paystackId: v.optional(v.string()),
    hasFreePlan: v.optional(v.boolean()),
    isAdmin: v.optional(v.boolean()),
    secretCode: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      const tempUser = await ctx.db
        .query("tempUsers")
        .filter((q) => q.eq(q.field("email"), args.email))
        .unique();

      const newUserId = await ctx.db.insert("users", {
        clerkId: args.clerkId,
        email: args.email,
        type: args.type || "customer",
        firstName: tempUser?.firstName || args.firstName,
        lastName: tempUser?.lastName || args.lastName,
        address: args.address || "",
        phoneNumber: tempUser?.phoneNumber,
        role: tempUser?.role || args.role,
        imageUrl: args.imageUrl,
        imageStorageId: args.imageStorageId,
        notificationType: "all",
        notificationMethod: "email",
        communication_updates: true,
        marketing_updates: false,
        social_updates: false,
        security_updates: true,
        stripeId: args.stripeId || "",
        paystackId: args.paystackId || "",
        hasFreePlan: false,
        isAdmin: false,
        secretCode: "",
      });

      if (tempUser) {
        await ctx.db.delete(tempUser._id);
      }

      const updatedUser = await ctx.db.get(newUserId);
      return updatedUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new ConvexError("Failed to create user.");
    }
  },
});

export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    email: v.optional(v.string()),
    type: v.optional(v.string()), //customer or technician
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    address: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    role: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    notificationMethod: v.optional(v.string()), // email, sms, whatsapp, call
    notificationType: v.optional(v.string()), // all, repairs only, none
    communication_updates: v.optional(v.boolean()), // true or false : default = true
    marketing_updates: v.optional(v.boolean()), // true or false
    social_updates: v.optional(v.boolean()), // true or false
    security_updates: v.optional(v.boolean()), // true or false : default = true
    hasFreePlan: v.optional(v.boolean()), 
    freePlanActivationDate: v.optional(v.string()),
    paidPlanActivationDate: v.optional(v.string()),
    stripeId: v.optional(v.string()),
    paystackId: v.optional(v.string()),
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
      ...(args.imageStorageId !== undefined && {
        imageStorageId: args.imageStorageId,
      }),
      ...(args.notificationMethod !== undefined && {
        notificationMethod: args.notificationMethod,
      }),
      ...(args.notificationType !== undefined && {
        notificationType: args.notificationType,
      }),
      ...(args.communication_updates !== undefined && {
        communication_updates: args.communication_updates,
      }),
      ...(args.marketing_updates !== undefined && {
        marketing_updates: args.marketing_updates,
      }),
      ...(args.social_updates !== undefined && {
        social_updates: args.social_updates,
      }),
      ...(args.security_updates !== undefined && {
        security_updates: args.security_updates,
      }),
      ...(args.email !== undefined && { email: args.email }),
      ...(args.phoneNumber !== undefined && { phoneNumber: args.phoneNumber }),
      ...(args.role !== undefined && { role: args.role }),
      ...(args.firstName !== undefined && { firstName: args.firstName }),
      ...(args.lastName !== undefined && { lastName: args.lastName }),
      ...(args.type !== undefined && { type: args.type }),
      ...(args.stripeId !== undefined && { stripeId: args.stripeId }),
      ...(args.paystackId !== undefined && { paystackId: args.paystackId }),
      ...(args.address !== undefined && { address: args.address }),
      ...(args.hasFreePlan !== undefined && { hasFreePlan: args.hasFreePlan }),
      ...(args.freePlanActivationDate !== undefined && { freePlanActivationDate: args.freePlanActivationDate }),
      ...(args.paidPlanActivationDate !== undefined && { paidPlanActivationDate: args.paidPlanActivationDate })
    };

    await ctx.db.patch(args.userId, updateFields);
    return args.userId;
  },
});

export const verifyUserIdentity = mutation({
  args: {
    userId: v.id("users"),
    identityVerificationUrl: v.optional(v.string()),
    identityVerificationStorageId: v.optional(v.id('_storage')),
    verificationStatus: v.optional(v.string()) // pending, verified, failed
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
      ...(args.identityVerificationUrl !== undefined && { identityVerificationUrl: args.identityVerificationUrl }),
      ...(args.identityVerificationStorageId !== undefined && {
        identityVerificationStorageId: args.identityVerificationStorageId,
      }),
      ...(args.verificationStatus !== undefined && { verificationStatus: args.verificationStatus })
    };

    await ctx.db.patch(args.userId, updateFields);
    return args.userId;
  },
});

export const deleteAndUpdateImage = mutation({
  args: {
    userId: v.id("users"),
    oldImageStorageId: v.id("_storage"),
    newImageUrl: v.string(),
    newImageStorageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await ctx.storage.delete(args.oldImageStorageId);

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const updateProfileImage = {
      ...(args.newImageUrl !== undefined && { imageUrl: args.newImageUrl }),
      ...(args.newImageStorageId !== undefined && {
        imageStorageId: args.newImageStorageId,
      }),
    };

    await ctx.db.patch(args.userId, updateProfileImage);
  },
});

export const saveNewProfileImage = mutation({
  args: {
    userId: v.id("users"),
    newImageUrl: v.string(),
    newImageStorageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const updateProfileImage = {
      ...(args.newImageUrl !== undefined && { imageUrl: args.newImageUrl }),
      ...(args.newImageStorageId !== undefined && {
        imageStorageId: args.newImageStorageId,
      }),
    };

    await ctx.db.patch(args.userId, updateProfileImage);
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
    stripeId: v.optional(v.string()),
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
      ...(args.stripeId !== undefined && { stripeId: args.stripeId }),
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
