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

export const sendEmail = action({
  args: {
    emailAddress: v.string(),
    subject: v.string(),
    letter: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const mailOptions = {
        from: {
          name: "Notification",
          address: smtpConfig.email,
        },
        to: args.emailAddress,
        subject: args.subject,
        html: args.letter,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.response}`);
      return {
        success: true,
        message: `Email sent successfully: ${info.response}`,
      };
    } catch (error) {
      console.error(`Failed to send email: ${error}`);
      throw new Error(`Failed to send email: ${error}`);
    }
  },
});