'use node'

import { v } from 'convex/values'
import { action } from './_generated/server'
import nodemailer from 'nodemailer'
import { api } from './_generated/api'

const smtpConfig = {
  email: process.env.SMTP_USER as string,
  host: 'smtppro.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASSWORD,
  },
}

const transporter = nodemailer.createTransport({
  host: smtpConfig.host,
  port: smtpConfig.port,
  secure: smtpConfig.secure,
  auth: {
    user: smtpConfig.auth.user,
    pass: smtpConfig.auth.pass,
  },
})

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
          name: 'MyGadgetPadi',
          address: smtpConfig.email,
        },
        to: args.emailAddress,
        subject: args.subject,
        html: args.letter,
      }

      const info = await transporter.sendMail(mailOptions)
      console.log(`Email sent: ${info.response}`)
      return {
        success: true,
        message: `Email sent successfully: ${info.response}`,
      }
    } catch (error) {
      console.error(`Failed to send email: ${error}`)
      throw new Error(`Failed to send email: ${error}`)
    }
  },
})

export const sendAdmin = action({
  args: {
    emailAddress: v.string(),
    userName: v.string(),
    userEmail: v.string(),
    verificationMode: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const { emailAddress, userName, userEmail, verificationMode } = args
      const subject = 'New Device Verification Request Submitted'
      const letter = `
          <h2>New Device Verification Request</h2>
          <p>Hello Admin,</p>
          <p>A new device verification request has been submitted by a user. Here are the details:</p>
          <ul>
            <li><strong>User Name:</strong> ${userName}</li>
            <li><strong>User Email:</strong> ${userEmail}</li>
            <li><strong>Verification Mode:</strong> ${verificationMode}</li>
          </ul>
          <p>Please review the request and take appropriate action.</p>
          <p>Best regards,<br>The MyGadgetPadi Team</p>
        `

      await ctx.runAction(api.sendEmail.sendEmail, {
        emailAddress,
        subject,
        letter,
      })
      return
    } catch (error) {
      throw new Error(`Failed to send email: ${error}`)
    }
  },
})

export const freePlanActivatedEmail = action({
  args: {
    emailAddress: v.string(),
    firstName: v.string(),
    device: v.string(),
    duration: v.string(),
    coverage: v.string(),
    claimLimit: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const { 
        emailAddress, 
        firstName, 
        device, 
        duration, 
        coverage, 
        claimLimit
      } = args;

      const subject = 'Your MyGadgetPadi FreePlan is Now Active!';
      const letter = `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your MyGadgetPadi FreePlan is Now Active!</title>
              </head>
              <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <p>Dear ${firstName},</p>
                <p>Congratulations on activating your Free Plan with MyGadgetPadi! Your <strong>${device}</strong> is now protected with essential coverage designed for your peace of mind.</p>
                <p><strong>Plan Coverage Highlights</strong></p>
                <ul>
                  <li><strong>Duration:</strong> ${duration}</li>
                  <li><strong>Coverage:</strong> ${coverage}</li>
                  <li><strong>Claim Limit:</strong> ${claimLimit}</li>
                  <li><strong>Additional Benefits:</strong> Free device diagnosis, remote support.</li>
                </ul>
                <p><strong>Next Steps</strong></p>
                <ul>
                  <li><strong>Dashboard Access:</strong> Manage your device’s coverage, monitor claims, and view plan details via your MyGadgetPadi Dashboard.</li>
                  <li><strong>Upgrade Offers:</strong> Keep an eye out for exclusive offers to upgrade to our Basic or Pro Plans for even more extensive coverage.</li>
                </ul>
                <p>For any questions, our customer support team is always ready to assist!</p>
                <p>Thank you for trusting MyGadgetPadi!</p>
                <p>Best regards,<br>
                The MyGadgetPadi Customer Support Team<br>
                <a href="tel:+2347076641696">+2347076641696</a></p>
              </body>
              </html>
              `;

      await ctx.runAction(api.sendEmail.sendEmail, {
        emailAddress,
        subject,
        letter,
      });
      return;
    } catch (error) {
      console.error(`Failed to send email: ${error}`);
      throw new Error(`Failed to send email: ${error}`);
    }
  },
});

export const basicPlanActivatedEmail = action({
  args: {
    emailAddress: v.string(),
    firstName: v.string(),
    device: v.string(),
    duration: v.string(),
    coverage: v.string(),
    claimLimit: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const { 
        emailAddress, 
        firstName, 
        device, 
        duration, 
        coverage, 
        claimLimit
      } = args;

      const subject = 'Your MyGadgetPadi Basic Plan is Now Active!';
      const letter = `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your MyGadgetPadi Basic Plan is Now Active!</title>
              </head>
              <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <p>Dear ${firstName},</p>
                <p>We’re excited to inform you that your Basic Plan for your <strong>${device}</strong> has been successfully activated. You’re now equipped with enhanced protection for greater device security.</p>
                <p><strong>Plan Coverage Highlights</strong></p>
                <ul>
                  <li><strong>Duration:</strong> ${duration}</li>
                  <li><strong>Coverage:</strong> ${coverage}</li>
                  <li><strong>Claim Limit:</strong> ${claimLimit}</li>
                  <li><strong>Additional Benefits:</strong> Higher flexibility compared to the Free Plan.</li>
                </ul>
                <p><strong>What You Can Do Next</strong></p>
                <ul>
                  <li><strong>Manage Your Plan:</strong> Access your MyGadgetPadi Dashboard to view your plan details, track claims, and manage your coverage.</li>
                  <li><strong>Verification Details:</strong> Your device verification is complete, ensuring comprehensive protection.</li>
                </ul>
                <p>If you need assistance, reach out via chat, email, or phone. We’re here to help!</p>
                <p>Thank you for choosing MyGadgetPadi for your device’s protection.</p>
                <p>Best regards,<br>
                The MyGadgetPadi Customer Support Team<br>
                <a href="tel:+2347076641696">+2347076641696</a></p>
              </body>
              </html>
              `;

      await ctx.runAction(api.sendEmail.sendEmail, {
        emailAddress,
        subject,
        letter,
      });
      return;
    } catch (error) {
      console.error(`Failed to send email: ${error}`);
      throw new Error(`Failed to send email: ${error}`);
    }
  },
});

export const proPlanActivatedEmail = action({
  args: {
    emailAddress: v.string(),
    firstName: v.string(),
    device: v.string(),
    duration: v.string(),
    coverage: v.string(),
    claimLimit: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const { 
        emailAddress, 
        firstName, 
        device, 
        duration, 
        coverage, 
        claimLimit
      } = args;

      const subject = 'Premium Coverage Activated - Welcome to the Pro Plan!';
      const letter = `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Premium Coverage Activated - Welcome to the Pro Plan!</title>
              </head>
              <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <p>Dear ${firstName},</p>
                <p>Thank you for choosing the Pro Plan with MyGadgetPadi! Your <strong>${device}</strong> is now fully protected with comprehensive coverage, providing you the ultimate peace of mind.</p>
                <p><strong>Plan Coverage Highlights</strong></p>
                <ul>
                  <li><strong>Duration:</strong> ${duration}</li>
                  <li><strong>Coverage:</strong> ${coverage}</li>
                  <li><strong>Claim Limit:</strong> ${claimLimit}</li>
                  <li><strong>Additional Benefits:</strong> Coverage for accidental damage, free pick-up and delivery, priority repairs.</li>
                </ul>
                <p><strong>Next Steps for You</strong></p>
                <ul>
                  <li><strong>Priority Dashboard Access:</strong> Your device appears in the Pro Plan section of your dashboard, where you can submit claims, view repair statuses, and track coverage.</li>
                  <li><strong>Exclusive Benefits:</strong> Enjoy priority support and quick claim processing tailored just for Pro Plan members.</li>
                </ul>
                <p>We’re dedicated to providing top-notch protection and support. Please don’t hesitate to reach out if you have any questions or need assistance.</p>
                <p>Thank you for choosing MyGadgetPadi’s Pro Plan!</p>
                <p>Best regards,<br>
                The MyGadgetPadi Customer Support Team<br>
                <a href="tel:+2347076641696">+2347076641696</a></p>
              </body>
              </html>
              `;

      await ctx.runAction(api.sendEmail.sendEmail, {
        emailAddress,
        subject,
        letter,
      });
      return;
    } catch (error) {
      console.error(`Failed to send email: ${error}`);
      throw new Error(`Failed to send email: ${error}`);
    }
  },
});