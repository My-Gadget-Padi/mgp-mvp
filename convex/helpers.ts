"use node";

import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

// export const generateId =  () => uuidv4();

export const generateId = internalAction({
  args: {},
  handler: (ctx, args) => {
    return uuidv4();
  },
});

export const hashOtp = internalAction({
  args: { otp: v.string(), salt: v.string() },
  handler: async (ctx, args) => {
    return crypto.createHmac("sha256", args.salt).update(args.otp).digest("hex");
  },
});

export const generateSalt = internalAction({
  args: {},
  handler: async (ctx, args) => {
    return crypto.randomBytes(16).toString("hex");
  },
});

export const generateAccessToken = internalAction({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return jwt.sign({ email: args.email }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
  },
});

export const verifyAccessToken = internalAction({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    return jwt.verify(args.token, process.env.JWT_SECRET!) as any;
  },
});
