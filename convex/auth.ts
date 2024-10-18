import { ConvexError, v } from "convex/values";
import { action } from "./_generated/server";
import { api, internal } from "./_generated/api";

export const sendOtp = action({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    try {
      const { email } = args;

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpires = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // Expiry in 5 minutes
      const salt = await ctx.runAction(internal.helpers.generateSalt);
      const hashedOtp = await ctx.runAction(internal.helpers.hashOtp, {
        otp,
        salt,
      });

      const existingUser = await ctx.runQuery(api.users.getUserByEmail, {
        email,
      });

      if (existingUser) {
        await ctx.runMutation(api.users.updateUser, {
          userId: existingUser._id,
          otp: hashedOtp,
          otpExpires,
          otpSalt: salt,
        });
      } else {
        await ctx.runMutation(internal.users.createUser, {
          email,
          otp: hashedOtp,
          otpExpires,
          otpSalt: salt,
        });
      }

      await ctx.runAction(internal.sendEmail.sendOtpEmail, { email, otp });

      return { message: "OTP sent" };
    } catch (error) {
      console.error("Error sending otp:", error);
      throw new ConvexError("Failed to send otp!");
    }
  },
});

export const verifyOtp = action({
  args: {
    email: v.string(),
    otp: v.string(),
    userAgent: v.any(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      const { email, otp, userAgent } = args;

      const user = await ctx.runQuery(api.users.getUserByEmail, {
        email,
      });

      if (!user || !user.otp || !user.otpExpires || !user.otpSalt) {
        throw new ConvexError("Invalid or expired OTP!");
      }

      if (new Date(user.otpExpires) <= new Date()) {
        throw new ConvexError("Invalid or expired OTP!");
      }

      const hashedOtp = await ctx.runAction(internal.helpers.hashOtp, {
        otp,
        salt: user.otpSalt,
      });

      if (hashedOtp !== user.otp) {
        throw new ConvexError("Invalid or expired OTP!");
      }

      const userId = user._id;
      await ctx.runMutation(api.users.updateUser, {
        userId,
        otp: undefined,
        otpExpires: undefined,
        otpSalt: undefined,
      });

      const sessionId: string = await ctx.runAction(internal.helpers.generateId);
      await ctx.runMutation(internal.sessions.createSession, {
        userId,
        sessionId,
        userAgent,
      });

      return { sessionId };
    } catch (error) {
      console.error("Error verifying otp:", error);
      throw new ConvexError(`Failed to verify otp! ${error}`);
    }
  },
});

export const signInWithGoogle = action({
  args: {
    email: v.string(),
    userAgent: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { email, firstName, lastName, userAgent } = args;

    try {
      let userId;

      const user = await ctx.runQuery(api.users.getUserByEmail, {
        email,
      });

      if (user) {
        userId = user._id;
      } else {
        const newUser = await ctx.runMutation(internal.users.createUser, {
          email,
          firstName,
          lastName,
        });

        if (!newUser) {
          throw new ConvexError("Failed to sign up with Google!");
        }
        userId = newUser._id;
      }

      const sessionId: string = await ctx.runAction(internal.helpers.generateId);
      await ctx.runMutation(internal.sessions.createSession, {
        userId,
        sessionId,
        userAgent,
      });

      return { sessionId };
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw new ConvexError("Failed to sign in with Google!");
    }
  },
});

// export const validateAccessToken = action({
//   args: {
//     accessToken: v.string(),
//   },
//   handler: async (ctx, args) => {
//     try {
//       const { accessToken } = args;

//       const { email } = await ctx.runAction(internal.helpers.verifyAccessToken, {
//         token: accessToken,
//       });
//       const user = await ctx.runQuery(api.users.getUserByEmail, { email });

//       if (!user) {
//         throw new ConvexError("User not found!");
//       }

//       return accessToken;
//     } catch (error) {
//       console.error("Error verifying otp:", error);
//       throw new ConvexError("Login Required!");
//     }
//   },
// });
