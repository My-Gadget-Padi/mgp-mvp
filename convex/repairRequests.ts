import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createRepairRequest = mutation({
  args: {
    userId: v.optional(v.id("users")),
    user_status: v.optional(v.string()), // guest or registered
    price: v.optional(v.number()),
    assignedTechnician: v.optional(v.id("users")),
    device: v.optional(v.string()),
    brandName: v.optional(v.string()),
    model: v.optional(v.string()),
    fileUrl: v.optional(v.string()),
    fileStorageId: v.optional(v.id("_storage")),
    contentType: v.optional(v.string()),
    address: v.optional(v.string()),
    dropOffLocation: v.optional(v.string()),
    damages: v.optional(v.array(v.string())),
    deviceSerialNumber: v.optional(v.string()),
    comments: v.optional(v.string()),
    priority: v.optional(v.string()), //high, medium, low
    deliveryType: v.optional(v.string()), //pick-up, drop-off
    deliveryTypeDate: v.optional(v.string()),
    deliveryTypeTime: v.optional(v.string()),
    warranty: v.optional(v.boolean()), //true or false
    status: v.optional(v.string()) //scheduled, received, assigned, in-progress, fixed, ready for pickup/delivery, delivered, cancelled
  },
  handler: async (ctx, args) => {

    const requestId = await ctx.db.insert("repairRequests", {
      userId: args.userId,
      user_status: args.user_status,
      price: args.price,
      assignedTechnician: args.assignedTechnician,
      device: args.device,
      brandName: args.brandName,
      model: args.model,
      fileUrl: args.fileUrl,
      fileStorageId: args.fileStorageId,
      contentType: args.contentType,
      address: args.address,
      dropOffLocation: args.dropOffLocation,
      damages: args.damages,
      deviceSerialNumber: args.deviceSerialNumber,
      comments: args.comments,
      priority: args.priority,
      deliveryType: args.deliveryType,
      deliveryTypeDate: args.deliveryTypeDate,
      deliveryTypeTime: args.deliveryTypeTime,
      warranty: args.warranty,
      status: args.status
    });

    return requestId;
  },
});

export const updateRepairRequest = mutation({
  args: {
    requestId: v.id("repairRequests"),
    userId: v.optional(v.id("users")),
    user_status: v.optional(v.string()), // guest or registered
    price: v.optional(v.number()),
    assignedTechnician: v.optional(v.id("users")),
    device: v.optional(v.string()),
    brandName: v.optional(v.string()),
    model: v.optional(v.string()),
    fileUrl: v.optional(v.string()),
    fileStorageId: v.optional(v.id("_storage")),
    contentType: v.optional(v.string()),
    address: v.optional(v.string()),
    dropOffLocation: v.optional(v.string()),
    damages: v.optional(v.array(v.string())),
    deviceSerialNumber: v.optional(v.string()),
    comments: v.optional(v.string()),
    priority: v.optional(v.string()), //high, medium, low
    deliveryType: v.optional(v.string()), //pick-up, drop-off, mail-in (not yet configured)
    deliveryTypeDate: v.optional(v.string()),
    deliveryTypeTime: v.optional(v.string()),
    warranty: v.optional(v.boolean()), //true or false
    status: v.optional(v.string()) //scheduled, received, assigned, in-progress, fixed, ready for pickup/delivery, delivered, cancelled
  },
  handler: async (ctx, args) => {

    const request = await ctx.db.get(args.requestId);

    if (!request) {
      throw new ConvexError("Request not found");
    }

    const updateRequest = {
      ...(args.userId !== undefined && { userId: args.userId }),
      ...(args.user_status !== undefined && { user_status: args.user_status }),
      ...(args.price !== undefined && { price: args.price }),
      ...(args.assignedTechnician !== undefined && { assignedTechnician: args.assignedTechnician }),
      ...(args.device !== undefined && { device: args.device }),
      ...(args.brandName !== undefined && { brandName: args.brandName }),
      ...(args.model !== undefined && { model: args.model }),
      ...(args.fileUrl !== undefined && { fileUrl: args.fileUrl }),
      ...(args.fileStorageId !== undefined && { fileStorageId: args.fileStorageId }),
      ...(args.contentType !== undefined && { contentType: args.contentType }),
      ...(args.address !== undefined && { address: args.address }),
      ...(args.dropOffLocation !== undefined && { dropOffLocation: args.dropOffLocation }),
      ...(args.damages !== undefined && { damages: args.damages }),
      ...(args.deviceSerialNumber !== undefined && { deviceSerialNumber: args.deviceSerialNumber }),
      ...(args.comments !== undefined && { comments: args.comments }),
      ...(args.priority !== undefined && { priority: args.priority }),
      ...(args.deliveryType !== undefined && { deliveryType: args.deliveryType }),
      ...(args.deliveryTypeDate !== undefined && { deliveryTypeDate: args.deliveryTypeDate }),
      ...(args.deliveryTypeTime !== undefined && { deliveryTypeTime: args.deliveryTypeTime }),
      ...(args.warranty !== undefined && { warranty: args.warranty }),
      ...(args.status !== undefined && { status: args.status }),
    };

    await ctx.db.patch(args.requestId, updateRequest);

    return args.requestId;
  },
});

export const deleteRepairRequest = mutation({
  args: {
    requestId: v.id("repairRequests"),
    fileStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const request = await ctx.db.get(args.requestId);

    if (!request) {
      throw new ConvexError("Request not found");
    }

    if (args.fileStorageId) {
      await ctx.storage.delete(args.fileStorageId);
    }

    return await ctx.db.delete(args.requestId);
  },
});

export const getAllRepairRequests = query({
  handler: async (ctx) => {
    return await ctx.db.query("repairRequests").order("desc").collect();
  },
});

export const getRepairRequestById = query({
  args: {
    requestId: v.id("repairRequests"),
  },
  handler: async (ctx, args) => {
    const request = await ctx.db.get(args.requestId);

    return request;
  },
});

export const getRepairRequestsByUserId = query({
  args: {
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const { userId } = args;

    const requests = await ctx.db
      .query("repairRequests")
      .filter(q => q.eq(q.field("userId"), userId))
      .collect();

    return requests;
  },
});

// this mutation is required to generate the url after uploading the phone/device image to the storage.
export const getUrl = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

// New APIs to create:
// For the landing page repair, it can still work with "createRepairRequest" and "updateRepairRequest", so no need to write those
// 1. Work on an API for the warranty that checks with the "deviceProtections" table to see if a user has a warranty with MyGadgetPadi.
// 2. Write an API that can set and update the availability of a technician ensuring that only available technicians can be assigned to a repair request.
// NOTE: Technicians are also stored on the "Users" table
// 3. Create a technician details schema and assign a userId to it.
// 4. Write an API that automatically assigns the most suitable technician to a repair request based on their location, availability, and device expertise.
// 5. Write the SMS sending API that notifies customers and technicians of updates, such as "new assignment" and repair status change.
// 6. Write a schema to track repair history
// 7. Write an API to collect feedback from customers after a repair has been completed, this will be used to rate work done and improve service quality.

// If you need any help with any, please let me know on WhatsApp, not cliq as I am more active there.
