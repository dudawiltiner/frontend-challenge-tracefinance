export function validateCpfCnpj(value: string): boolean {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.length === 11 || cleaned.length === 14;
}
