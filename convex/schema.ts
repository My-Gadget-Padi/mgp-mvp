import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'
import { verify } from 'crypto'

export default defineSchema({
  tempUsers: defineTable({
    email: v.optional(v.string()),
    type: v.optional(v.string()), //customer or technician
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    role: v.optional(v.string()),
  }),

  users: defineTable({
    email: v.string(),
    clerkId: v.string(),
    type: v.optional(v.string()), //customer or technician
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    address: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    role: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id('_storage')),
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
    hasFreePlan: v.optional(v.boolean()),
    freePlanActivationDate: v.optional(v.string()),
    paidPlanActivationDate: v.optional(v.string()),
    identityVerificationUrl: v.optional(v.string()),
    identityVerificationStorageId: v.optional(v.id('_storage')),
    verificationStatus: v.optional(v.string()) // pending, verified, failed
  }),

  //admin

  repairRequests: defineTable({
    userId: v.optional(v.id('users')),
    protectionId: v.optional(v.id('deviceProtections')),
    user_status: v.optional(v.string()), // guest or registered
    price: v.optional(v.number()),
    assignedTechnician: v.optional(v.id('users')),
    device: v.optional(v.string()),
    brandName: v.optional(v.string()),
    model: v.optional(v.string()),
    fileUrl: v.optional(v.string()),
    fileStorageId: v.optional(v.id('_storage')),
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
    status: v.optional(v.string()), //scheduled, received, assigned, in-progress, fixed, ready for pickup/delivery, delivered, cancelled
  }),

  devices: defineTable({
    userId: v.id('users'),
    protection: v.id('deviceProtections'),
    planName: v.string(),
    type: v.string(),
    brand: v.string(),
    model: v.string(),
    condition: v.string(),
    serialNumber: v.string(),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id('_storage')),
    isVerified: v.boolean(),
  }),

  verificationRequests: defineTable({
    userId: v.id('users'),
    deviceId: v.id('devices'),
    verificationMode: v.string(),
    status: v.string(), //pending, verified, rejected
    adminComments: v.optional(v.string()),

    proofOfOwnershipUrl: v.string(),
    proofStorageId: v.id('_storage'),

    //image/video
    verificationUrl: v.optional(v.string()),
    verificationStorageId: v.optional(v.id('_storage')),
    contentType: v.optional(v.string()),

    //call
    callDate: v.optional(v.string()),
    callTime: v.optional(v.string()),

    //hub
    addressSelected: v.optional(v.string()),

    verifyByAdminId: v.optional(v.id('users')),
    dateVerified: v.optional(v.string())
  }),

  deviceProtections: defineTable({
    userId: v.id('users'),
    planId: v.id('plans'),
    deviceId: v.optional(v.id('devices')),
    type: v.string(), //monthly or yearly
    name: v.string(),
    amountLeft: v.number(),
    claimsAvailable: v.number(),
    activationDate: v.optional(v.string()),
    expiryDate: v.optional(v.string()),
  }),

  //Schema for plans to be written
  plans: defineTable({
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
  }),

  notifications: defineTable({
    userId: v.id('users'),
    type: v.string(), //account, repairs, protections, security, offers, warranty, payments, security
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    emailAddress: v.optional(v.string()),
    phoneNumber: v.optional(v.number()),
    read: v.boolean(), //true or false
    response: v.optional(v.string()),
  }),

  payments: defineTable({
    userId: v.id('users'),
    planId: v.optional(v.id('plans')),
    repairRequestId: v.optional(v.id('repairRequests')),
    amount: v.number(),
    status: v.string(),
    paymentLink: v.optional(v.string()),
    reference: v.string(),
    description: v.optional(v.string()),
    initialConfig: v.any(),
    finalConfig: v.optional(v.any()),
    paidAt: v.optional(v.string()),
  }),
})
