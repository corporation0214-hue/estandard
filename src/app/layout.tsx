import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "estandard.mn — ISO Нэгдсэн Удирдлагын Тогтолцоо",
  description:
    "ISO 9001, 14001, 45001, 27001, 31000 стандартуудыг нэвтрүүлэх цахим платформ. GAP шинжилгээ, баримт бичиг, эрсдэл, аудитын удирдлага.",
  metadataBase: new URL("https://estandard.mn"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="mn"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
