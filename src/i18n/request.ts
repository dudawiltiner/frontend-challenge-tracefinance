import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

import { Langs, defaultDictionary } from '@dictionaries/default-dictionaries';

export default getRequestConfig(async () => {
  const headersList = await headers();
  const locale = (headersList.get('x-next-intl-locale') || 'pt-BR') as Langs;

  return {
    locale,
    messages: defaultDictionary[locale],
  };
});
