import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RestaurantAI | Food Discovery Platform",
  description: "AI-Powered Restaurant Intelligence & Review Analytics Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 font-sans antialiased">
        <main className="flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
