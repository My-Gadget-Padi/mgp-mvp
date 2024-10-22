import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tempUsers: defineTable({
    email: v.optional(v.string()),
    type: v.optional(v.string()), //customer or technician
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    phoneNumber: v.optional(v.string())
  }),

  users: defineTable({
    email: v.string(),
    clerkId: v.string(),
    type: v.optional(v.string()), //customer or technician
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    address: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
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
    isAdmin: v.optional(v.boolean()),
    secretCode: v.optional(v.string()),
  }),

  //admin

  repairRequests: defineTable({
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
    deliveryType: v.optional(v.string()), //pickup, drop-off, mail-in (not yet configured)
    deliveryTypeDate: v.optional(v.string()),
    deliveryTypeTime: v.optional(v.string()),
    warranty: v.optional(v.boolean()), //true or false
    status: v.optional(v.string()) //scheduled, received, assigned, in-progress, fixed, ready for pickup/delivery, delivered, cancelled
  }),

  devices: defineTable({
    userId: v.id("users"),
    phoneNumber: v.number(),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    name: v.string(),
    model: v.string(),
    serialNumber: v.number(),
    protection: v.optional(v.id("deviceProtections"))
  }),

  deviceProtections: defineTable({
    userId: v.id("users"),
    phoneNumber: v.number(),
    devices: v.array(v.id("devices")), //max 3 devices
    type: v.string(), //monthly or yearly
    name: v.string(),
    price: v.number()
  }),

  //Schema for plans to be written

  notifications: defineTable({
    userId: v.id("users"),
    type: v.string(), //account, repairs, protections, security, offers, warranty, payments, security
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    emailAddress: v.optional(v.string()),
    phoneNumber: v.optional(v.number()),
    read: v.boolean(), //true or false
    response: v.optional(v.string())
  })
});