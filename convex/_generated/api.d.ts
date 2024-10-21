/* prettier-ignore-start */

/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as deviceProtections from "../deviceProtections.js";
import type * as devices from "../devices.js";
import type * as files from "../files.js";
import type * as helpers from "../helpers.js";
import type * as http from "../http.js";
import type * as notifications from "../notifications.js";
import type * as oauth from "../oauth.js";
import type * as repairRequests from "../repairRequests.js";
import type * as sendEmail from "../sendEmail.js";
import type * as sendSMS from "../sendSMS.js";
import type * as sendWhatsApp from "../sendWhatsApp.js";
import type * as sessions from "../sessions.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  deviceProtections: typeof deviceProtections;
  devices: typeof devices;
  files: typeof files;
  helpers: typeof helpers;
  http: typeof http;
  notifications: typeof notifications;
  oauth: typeof oauth;
  repairRequests: typeof repairRequests;
  sendEmail: typeof sendEmail;
  sendSMS: typeof sendSMS;
  sendWhatsApp: typeof sendWhatsApp;
  sessions: typeof sessions;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

/* prettier-ignore-end */
