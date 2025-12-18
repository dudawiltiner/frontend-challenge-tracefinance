'use client';

import { useLocale as useNextIntlLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import { Langs } from '@dictionaries/default-dictionaries';

import { localeNames, locales } from '@i18n/config';

export const useLocale = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useNextIntlLocale() as Langs;

  const changeLocale = (newLocale: Langs) => {
    if (newLocale === currentLocale) return;

    const segments = pathname?.split('/') || [];
    const currentLocaleIndex = segments.findIndex((seg) =>
      locales.includes(seg as Langs)
    );

    if (currentLocaleIndex !== -1) {
      segments[currentLocaleIndex] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }

    const newPath = segments.join('/');
    router.push(newPath);
    router.refresh();
  };

  return {
    currentLocale,
    locales,
    localeNames,
    changeLocale,
  };
};
