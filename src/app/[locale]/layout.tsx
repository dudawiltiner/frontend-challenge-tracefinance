import { ReactNode } from 'react';

import { notFound } from 'next/navigation';

import { Langs } from '@dictionaries/default-dictionaries';

import { locales } from '../../i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Langs)) {
    notFound();
  }

  return <div lang={locale}>{children}</div>;
}
