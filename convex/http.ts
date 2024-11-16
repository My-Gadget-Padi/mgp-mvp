// ===== reference links =====
// https://www.convex.dev/templates (open the link and choose for clerk than you will get the github link mentioned below)
// https://github.dev/webdevcody/thumbnail-critique/blob/6637671d72513cfe13d00cb7a2990b23801eb327/convex/schema.ts

import type { WebhookEvent } from "@clerk/nextjs/server";
import { httpRouter } from "convex/server";
import { Webhook as ClerkWebhook } from "svix";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

const handleClerkWebhook = httpAction(async (ctx, request) => {
  const event = await validateClerkRequest(request);
  if (!event) {
    return new Response("Invalid request", { status: 400 });
  }

  switch (event.type) {
    case "user.created":
      await ctx.runMutation(internal.users.createUser, {
        clerkId: event.data.id,
        email: event.data.email_addresses[0].email_address,
        firstName: event.data.first_name || "",
        lastName: event.data.last_name || "",
        imageUrl: event.data.image_url,
      });
      break;
    case "user.updated":
      await ctx.runMutation(internal.users.updateClerkUser, {
        clerkId: event.data.id,
        imageUrl: event.data.image_url,
        email: event.data.email_addresses[0].email_address,
        firstName: event.data.first_name || "",
        lastName: event.data.last_name || "",
      });
      break;
    case "user.deleted":
      await ctx.runMutation(internal.users.deleteClerkUser, {
        clerkId: event.data.id as string,
      });
      break;
  }
  return new Response(null, { status: 200 });
});

// ===== Common Route Setup =====
http.route({
  path: "/clerk",
  method: "POST",
  handler: handleClerkWebhook,
});

const validateClerkRequest = async (
  req: Request
): Promise<WebhookEvent | undefined> => {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;
  if (!webhookSecret) {
    throw new Error("CLERK_WEBHOOK_SECRET is not defined");
  }
  const payloadString = await req.text();
  const headerPayload = req.headers;
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };
  const wh = new ClerkWebhook(webhookSecret);
  const event = wh.verify(payloadString, svixHeaders);
  return event as unknown as WebhookEvent;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.CLIENT_ORIGIN!,
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Handle preflight OPTIONS request
http.route({
  path: "/getPlanByName",
  method: "OPTIONS",
  handler: httpAction(async (request) => {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }),
});

// Handle GET request
http.route({
  path: "/getPlanByName",
  method: "GET",
  handler: httpAction(async ({ runQuery }, request) => {
    const url = new URL(request.url);
    const name = url.searchParams.get("name");

    if (!name) {
      return new Response("Missing name", { status: 400, headers: corsHeaders });
    }

    const plan = await runQuery(api.plans.getPlanByName, { name });

    if (!plan) {
      return new Response("Plan not found", { status: 404, headers: corsHeaders });
    }

    return new Response(JSON.stringify(plan), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }),
});

export default http;