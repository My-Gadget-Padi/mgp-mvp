import { v4 as uuidv4 } from "uuid";
import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import * as helpers from "./helpers";
import { sendOtpEmail } from "./sendEmail";

export const sendOtp = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    try {
      const { email } = args;

      const otp = helpers.generateOtp();
      const otpExpires = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // Expiry in 5 minutes
      const salt = helpers.generateSalt();

      // const hashedOtp = await ctx.scheduler.runAfter(0, helper.hashOtp(otp,salt))
      const hashedOtp = helpers.hashOtp(otp, salt);

      const existingUser = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("email"), email))
        .unique();

      if (existingUser) {
        await ctx.db.patch(existingUser._id, {
          otp: hashedOtp,
          otpExpires,
          otpSalt: salt,
        });
      } else {
        await ctx.db.insert("users", {
          email,
          otp: hashedOtp,
          otpExpires,
          otpSalt: salt,
        });
      }

      await sendOtpEmail({ otp, email });

      return { message: "OTP sent" };
    } catch (error) {
      console.error("Error sending otp:", error);
      throw new ConvexError("Failed to send otp!");
    }
  },
});

export const verifyOtp = mutation({
  args: {
    email: v.string(),
    otp: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      const { email, otp } = args;

      const user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("email"), email))
        .unique();

      if (!user || !user.otp || !user.otpExpires || !user.otpSalt) {
        throw new ConvexError("Invalid or expired OTP!");
      }

      if (new Date(user.otpExpires) <= new Date()) {
        throw new ConvexError("Invalid or expired OTP!");
      }

      const hashedOtp = helpers.hashOtp(otp, user.otpSalt);

      if (hashedOtp !== user.otp) {
        throw new ConvexError("Invalid or expired OTP!");
      }

      const updatedFields = {
        otp: undefined,
        otpExpires: undefined,
        otpSalt: undefined,
      };

      await ctx.db.patch(user._id, updatedFields);
      const sessionId = await createSession(ctx, { userId: user._id });
      // const accessToken = helpers.generateAccessToken(email)

      return { sessionId };
    } catch (error) {
      console.error("Error verifying otp:", error);
      throw new ConvexError("Failed to verify otp!");
    }
  },
});

export const signInWithGoogle = mutation({
  args: {
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { email, firstName, lastName } = args;

    try {
      let userId;
      const user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("email"), email))
        .unique();

      if (!user) {
        userId = await ctx.db.insert("users", {
          email,
          firstName,
          lastName,
        });
      } else {
        userId = user._id;
      }

      const sessionId = await createSession(ctx, { userId });

      return { sessionId };
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw new ConvexError("Failed to sign in with Google!");
    }
  },
});

export const createSession = async (ctx: any, args: { userId: string }) => {
  const { userId } = args;

  const sessionId = uuidv4();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  await ctx.db.insert("sessions", {
    userId,
    sessionId,
    createdAt: new Date().toISOString(),
    expiresAt,
  });

  return { sessionId };
};

export const validateAccessToken = mutation({
  args: {
    accessToken: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const { accessToken } = args;

      const { email } = helpers.verifyAccessToken(accessToken);
      const user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("email"), email))
        .unique();

      if (!user) {
        throw new ConvexError("User not found!");
      }

      return accessToken;
    } catch (error) {
      console.error("Error verifying otp:", error);
      throw new ConvexError("Login Required!");
    }
  },
});
