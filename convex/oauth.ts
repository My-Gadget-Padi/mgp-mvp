"use node";

import { OAuth2Client } from "google-auth-library";
import { action, internalAction } from "./_generated/server";
import { v } from "convex/values";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_OAUTH_REDIRECT_URL;

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
  "openid",
];

export const googleSignin = action({
  args: {},
  handler: async (ctx, args) => {
    return oauth2Client.generateAuthUrl({
      client_id: CLIENT_ID,
      access_type: "offline",
      scope: scopes,
    });
  },
});

export const verifyCallback = internalAction({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    try {
      const { tokens } = await oauth2Client.getToken(args.code);
      oauth2Client.setCredentials(tokens);
      if (!tokens.id_token) {
        return;
      }

      const ticket = await oauth2Client.verifyIdToken({
        idToken: tokens.id_token,
        audience: CLIENT_ID,
      });
      return ticket.getPayload();
    } catch (error) {
      console.error("Error exchanging code for tokens:", error);
      return;
    }
  },
});
