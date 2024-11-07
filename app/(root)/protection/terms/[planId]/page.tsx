"use client";

import React from "react";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const ProtectionTerms = ({
  params: { planId },
}: {
  params: { planId: Id<"plans"> };
}) => {
  const plan = useQuery(api.plans.getPlanById, {
    planId,
  });

  return (
    <main className="flex flex-1 mt-6 sm:mt-0 flex-col gap-4 p-4 lg:gap-2 lg:p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground">
          Terms and Conditions for the {plan?.name} with MyGadgetPadi
        </h1>
        <p className="text-muted-foreground">
          Effective Date: 6th November, 2024
        </p>

        <div className="space-y-8 mt-8">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              1. Introduction
            </h2>
            <p className="text-muted-foreground">
              These Terms and Conditions govern your use of our platform. By
              accessing or using this protection plan, you agree to comply with
              and be bound by these terms. If you do not agree with any part of
              these terms, you must not use our service.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              2. User Accounts
            </h2>
            <p className="text-muted-foreground">
              To access certain features of mygadgetpadi, you may be required to
              create an account. You agree to provide accurate, current, and
              complete information during the registration process and to update
              such information to keep it accurate, current, and complete.
            </p>
            <p className="text-muted-foreground">
              Users will receive a unique link associated with their account.
              This link is personal and should not be shared with others. You
              are responsible for maintaining the confidentiality of your
              account and password and for all activities that occur under your
              account.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              3. User Obligations
            </h2>
            <p className="text-muted-foreground">
              You agree to use mygadgetpadi only for lawful purposes. You must
              not:
            </p>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Engage in any fraudulent or deceptive activity.</li>
              <li>
                Impersonate any person or entity, or misrepresent your
                affiliation with a person or entity.
              </li>
              <li>
                Upload, post, or transmit any content that infringes any
                intellectual property rights.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              4. Payment and Subscription Policies
            </h2>
            <p className="text-muted-foreground">
              mygadgetpadi may offer subscription services. Payment terms will
              be specified at the time of purchase. You agree to provide
              accurate payment information and authorize mygadgetpadi to charge
              you for the subscription fees.
            </p>
            <p className="text-muted-foreground">
              You may cancel your subscription at any time through your account
              settings. All fees are non-refundable unless otherwise stated.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              5. Intellectual Property Rights
            </h2>
            <p className="text-muted-foreground">
              All content, trademarks, and other intellectual property on
              mygadgetpadi are the property of mygadgetpadi or our licensors.
              You may not reproduce, distribute, or create derivative works of
              any content from our platform without express permission.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              6. Disclaimers and Limitation of Liability
            </h2>
            <p className="text-muted-foreground">
              mygadgetpadi is provided "as is" without any warranties of any
              kind, either express or implied. We do not guarantee the accuracy,
              reliability, or completeness of the content on the platform.
            </p>
            <p className="text-muted-foreground">
              To the fullest extent permitted by law, we shall not be liable for
              any indirect, incidental, special, consequential, or punitive
              damages arising out of or in connection with your use of
              mygadgetpadi.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              7. Privacy Policy
            </h2>
            <p className="text-muted-foreground">
              Our Privacy Policy explains how we collect, use, and protect your
              personal information. By using mygadgetpadi, you consent to our
              collection and use of personal data as described in the Privacy
              Policy. Please{" "}
              <Link href="/policy" className="text-[#6445E8] hover:underline">
                review it here
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              8. User Content
            </h2>
            <p className="text-muted-foreground">
              You retain all rights to any content you submit, post, or display
              on or through mygadgetpadi. By submitting content, you grant us a
              non-exclusive, worldwide, royalty-free license to use, copy,
              modify, publish, and distribute such content.
            </p>
            <p className="text-muted-foreground">
              You are solely responsible for your content and the consequences
              of posting it. We do not endorse any user content and reserve the
              right to remove any content that violates these terms.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              9. Jurisdiction and Dispute Resolution
            </h2>
            <p className="text-muted-foreground">
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of Nigeria. Any disputes arising from
              these terms will be settled through binding arbitration in
              accordance with the rules of the Nigerian Court.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              10. Notification of Changes
            </h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms and Conditions at any
              time. We will notify you of significant changes by posting the new
              terms on this page. Your continued use of mygadgetpadi after any
              modifications signifies your acceptance of the new terms.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              11. Contact Information
            </h2>
            <p className="text-muted-foreground">
              If you have any questions or concerns regarding this Privacy
              Policy, please contact us at{" "}
              <Link
                href="mailto:support@mygadgetpadi.com"
                className="text-[#6445E8] hover:underline"
              >
                support@mygadgetpadi.com
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProtectionTerms;