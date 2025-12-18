import { parseISO } from 'date-fns';

export function formatTransactionDate(
  dateString: string,
  locale: string = 'pt-BR'
): string {
  try {
    const date = parseISO(dateString);

    const isPortuguese = locale === 'pt-BR' || locale.startsWith('pt');

    const dateFormatter = new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit',
      hour12: !isPortuguese,
    });

    let formatted = dateFormatter.format(date);

    if (isPortuguese) {
      formatted = formatted.replace(/\./g, '');
    }

    return formatted;
  } catch {
    return dateString;
  }
}

export function formatMonthYear(date: Date, locale: string = 'pt-BR'): string {
  const formatter = new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
  });
  return formatter.format(date);
}
