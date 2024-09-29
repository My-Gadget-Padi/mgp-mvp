// app/auth/layout.js
export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* No header or footer */}
        {children}
      </body>
    </html>
  );
}

