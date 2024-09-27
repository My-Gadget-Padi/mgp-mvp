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