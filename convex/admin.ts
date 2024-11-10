"use node";

import { ConvexError, v } from "convex/values";
import { action } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export const createUser = action({
  args: {
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    phoneNumber: v.string(),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Check if user is authorized to create users
      const signedUser = await currentUser();
      if (signedUser?.publicMetadata?.role !== "super") {
        throw new ConvexError("You are not authorized to perform this action!");
      }

      // Create clerk user
      const clerkUser = await clerkClient.users.createUser({
        publicMetadata: {
          email: args.email,
          firstName: args.firstName,
          lastName: args.lastName,
          phoneNumber: args.phoneNumber,
          role: args.role,
        },
      });

      // Create convex user
      const user = {
        clerkId: clerkUser.id,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        phoneNumber: args.phoneNumber,
        role: args.role,
      };
      await ctx.runMutation(internal.users.createUser, user);

      return user;
    } catch (error) {
      console.error(`Failed to send email: ${error}`);
      throw new ConvexError(`Failed to send email: ${error}`);
    }
  },
});
