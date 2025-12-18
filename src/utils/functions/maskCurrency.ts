export function maskCurrency(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  const number = parseInt(cleaned, 10) || 0;
  return (number / 100)
    .toFixed(2)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function unmaskCurrency(value: string): number {
  const cleaned = value.replace(/\D/g, '');
  return parseInt(cleaned, 10) || 0;
}
