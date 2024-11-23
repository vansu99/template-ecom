import '../styles/globals.css';

import type { Metadata } from 'next';
import { Noto_Sans_JP, Roboto } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import QueryClientProviders from '@/common/providers/QueryClientProvider';
import { ErrorBoundary } from '@/components/error-boundary';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${notoSansJP.variable} ${roboto.variable} antialiased`}>
        <NextTopLoader />
        <QueryClientProviders>
          <NextIntlClientProvider messages={messages}>
            <ErrorBoundary>{children}</ErrorBoundary>
          </NextIntlClientProvider>
        </QueryClientProviders>
      </body>
    </html>
  );
}
