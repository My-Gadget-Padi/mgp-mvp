"use node";

import { v } from "convex/values";
import { action, internalAction } from "./_generated/server";
import nodemailer from "nodemailer";

const smtpConfig = {
  email: process.env.EMAIL_SERVER_FROM!,
  host: process.env.EMAIL_SERVER_HOST,
  port: 587, // switch to 465 for production
  secure: false, // switch to true for production
  ignoreTLS: true, // remove in production
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
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
    letter: v.string(),
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

export const sendOtpEmail = internalAction({
  args: {
    email: v.string(),
    otp: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const mailOptions = {
        from: {
          name: "Verification",
          address: smtpConfig.email,
        },
        to: args.email,
        subject: "Verify Your Email",
        html: `<p>Welcome to MyGadgetPadi</p><p>Please continue your verification process by entering this otp</p><p>${args.otp}</p>`,
      };

      console.log({ transporter });
      console.log({ smtpConfig });
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
