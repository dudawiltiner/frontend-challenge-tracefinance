export function formatCurrency(
  value: number,
  currency: string = 'BRL',
  locale: string = 'pt-BR'
): string {
  const currencyMap: Record<string, string> = {
    'pt-BR': 'BRL',
    'en-US': 'USD',
  };

  const finalCurrency = currency || currencyMap[locale] || 'BRL';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: finalCurrency,
    minimumFractionDigits: 2,
  }).format(value / 100);
}
