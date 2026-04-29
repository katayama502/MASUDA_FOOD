import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '益田めし応援団',
  description: 'まちの飲食店の余りものをすくい、まちのごはんを未来へつなぐ。',
  openGraph: {
    title: '益田めし応援団',
    description: 'まちの飲食店の余りものをすくい、まちのごはんを未来へつなぐ。',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-kinari text-sumi font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
