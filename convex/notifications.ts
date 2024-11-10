import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createNotification = mutation({
  args: {
    userId: v.id("users"),
    type: v.string(), //account, repairs, protections, security, offers, warranty, payments, security
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    emailAddress: v.optional(v.string()),
    phoneNumber: v.optional(v.number()),
    read: v.boolean(), //true or false
    response: v.optional(v.string())
  },
  handler: async (ctx, args) => {

    const notificationId = await ctx.db.insert("notifications", {
      userId: args.userId,
      type: args.type,
      title: args.title || "",
      description: args.description || "",
      emailAddress: args.emailAddress,
      phoneNumber: args.phoneNumber,
      read: args.read,
      response: args.response
    });

    return notificationId;
  },
});

export const updateNotification = mutation({
  args: {
    notificationId: v.id("notifications"),
    userId: v.optional(v.id("users")),
    type: v.optional(v.string()), //account, repairs, protections, security, offers, warranty, payments, security
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    emailAddress: v.optional(v.string()),
    phoneNumber: v.optional(v.number()),
    read: v.boolean(), //true or false
    response: v.optional(v.string())
  },
  handler: async (ctx, args) => {

    const notification = await ctx.db.get(args.notificationId);

    if (!notification) {
      throw new ConvexError("Notification not found");
    };

    const updateNotification = {
      ...(args.userId !== undefined && { userId: args.userId }),
      ...(args.type !== undefined && { type: args.type }),
      ...(args.title !== undefined && { title: args.title }),
      ...(args.description !== undefined && { description: args.description }),
      ...(args.emailAddress !== undefined && { emailAddress: args.emailAddress }),
      ...(args.phoneNumber !== undefined && { phoneNumber: args.phoneNumber }),
      ...(args.read !== undefined && { read: args.read }),
      ...(args.response !== undefined && { response: args.response })
    };

    await ctx.db.patch(args.notificationId, updateNotification);

    return args.notificationId;
  },
});

export const deleteNotification = mutation({
  args: {
    notificationId: v.id("notifications"),
  },
  handler: async (ctx, args) => {
    const notification = await ctx.db.get(args.notificationId);

    if (!notification) {
      throw new ConvexError("Notification not found");
    };

    return await ctx.db.delete(args.notificationId);
  },
});

export const getAllNotifications = query({
  handler: async (ctx) => {
    return await ctx.db.query("notifications").order("desc").collect();
  },
});

export const getNotificationById = query({
  args: {
    notificationId: v.id("notifications"),
  },
  handler: async (ctx, args) => {
    const notification = await ctx.db.get(args.notificationId);

    return notification;
  },
});

export const getNotificationByUserId = query({
  args: {
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const { userId } = args;

    const notifications = await ctx.db
      .query("notifications")
      .filter(q => q.eq(q.field("userId"), userId))
      .collect();

    return notifications;
  },
});