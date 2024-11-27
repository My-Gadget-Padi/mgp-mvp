const emails = process.env.NEXT_PUBLIC_EMAILS?.split(",").map((email) => `mailto:${email}`) || [];
let emailIndex = 0;

setInterval(() => {
  emailIndex = (emailIndex + 1) % emails.length;
}, 60 * 60 * 1000);

export function getCurrentEmail() {
  return emails[emailIndex];
}