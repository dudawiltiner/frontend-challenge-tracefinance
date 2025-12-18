import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Poppins } from 'next/font/google';

import { SharedConfigProvider } from '@context/SharedConfigContext';

import { ErrorBoundaryProvider } from '@providers/ErrorBoundaryProvider';

import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html className={poppins.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const getSystemTheme = () => {
                  if (typeof window !== 'undefined' && window.matchMedia) {
                    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  return 'light';
                };
                const savedTheme = localStorage.getItem('theme');
                const themeToApply = savedTheme || 'system';
                const actualTheme = themeToApply === 'system' ? getSystemTheme() : themeToApply;
                if (actualTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SharedConfigProvider>
            <ErrorBoundaryProvider>{children}</ErrorBoundaryProvider>
          </SharedConfigProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
