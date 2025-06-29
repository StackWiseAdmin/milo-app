import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 font-sans">
        <main className="max-w-4xl mx-auto px-4 py-16">
          {children}
        </main>
      </body>
    </html>
  );
}
