import type { Metadata } from 'next';
import { Noto_Sans_JP, Roboto } from 'next/font/google';
import '../styles/globals.css';

const notoSansJP = Noto_Sans_JP({
  variable: '--noto-sans',
  weight: ['100', '400', '500', '600', '700'],
  style: 'normal',
  display: 'fallback',
  subsets: ['latin'],
  fallback: ['system-ui'],
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '400', '500', '700'],
  display: 'fallback',
  variable: '--roboto',
  fallback: ['system-ui'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansJP.variable} ${roboto.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
