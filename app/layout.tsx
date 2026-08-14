import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Flashcard Generator",
  description: "Turn any text into flip-through flashcards instantly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-gray-900">{children}</body>
    </html>
  );
}
