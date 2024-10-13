import crypto from "crypto";
import jwt from "jsonwebtoken";
import { action } from "./_generated/server";
import { v } from "convex/values";

// export const hashOtp = action({
//   args: { otp: v.string(), salt: v.string() },
//   handler: (_, args) => {
//     return crypto.createHmac("sha256", args.salt).update(args.otp).digest("hex");
//   },
// });

export const hashOtp = (otp: string, salt: string): string => {
  return crypto.createHmac("sha256", salt).update(otp).digest("hex");
};

export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateSalt = () => {
  return crypto.randomBytes(16).toString("hex");
};

export const generateAccessToken = (email: string) => {
  return jwt.sign({ email }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!) as any;
};
