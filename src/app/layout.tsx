import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "益田めし応援団 | 地域飲食店を一緒に支えよう",
  description:
    "月額サブスクで益田の飲食店を応援。余り物フードの受け取り権と来店特典で、食品ロスを減らしながらまちの食文化を守ります。",
  openGraph: {
    title: "益田めし応援団",
    description: "月額サブスクで益田の飲食店を応援しよう",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
