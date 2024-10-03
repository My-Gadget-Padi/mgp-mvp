import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Fix | MyGadgetPadi",
  description:
    "Quickly and easily request a fix for any of your devices on MyGadgetPadi.",
};

export default function RepairLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* No header or footer */}
        {children}
      </body>
    </html>
  );
};