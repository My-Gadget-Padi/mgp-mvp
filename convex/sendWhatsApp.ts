"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import nodemailer from "nodemailer";

const smtpConfig = {
  email: "",
  host: "",
  port: 465,
  secure: true,
  auth: {
    user: "",
    pass: "",
  },
};

const transporter = nodemailer.createTransport({
  host: smtpConfig.host,
  port: smtpConfig.port,
  secure: smtpConfig.secure,
  auth: {
    user: smtpConfig.auth.user,
    pass: smtpConfig.auth.pass,
  },
});

export const sendWhatsApp = action({
  args: {
    phoneNumber: v.string(),
    message: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const mailOptions = {
        from: {
          name: "Notification",
          address: smtpConfig.email,
        },
        to: args.phoneNumber,
        html: args.message,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`SMS sent: ${info.response}`);
      return {
        success: true,
        message: `SMS sent successfully: ${info.response}`,
      };
    } catch (error) {
      console.error(`Failed to send SMS: ${error}`);
      throw new Error(`Failed to send SMS: ${error}`);
    }
  },
});