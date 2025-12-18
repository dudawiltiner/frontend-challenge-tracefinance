const extractValueChars = (value: string, hasLetterMask: boolean): string[] => {
  if (hasLetterMask) {
    return value.replace(/[^A-Za-z0-9]/g, '').split('');
  }
  return value.replace(/\D/g, '').split('');
};

const isValidDigit = (char: string): boolean => /\d/.test(char);

const isValidLetter = (char: string): boolean => /[A-Za-z]/.test(char);

const processStringMaskChar = (
  maskChar: string,
  valueChar: string,
  result: string[],
  valueIndex: { current: number }
): { shouldBreak: boolean; result: string } => {
  if (maskChar === '9') {
    if (isValidDigit(valueChar)) {
      result.push(valueChar);
      valueIndex.current++;
      return { shouldBreak: false, result: result.join('') };
    }
    return { shouldBreak: true, result: result.join('') };
  }

  if (maskChar === 'a') {
    if (isValidLetter(valueChar)) {
      result.push(valueChar);
      valueIndex.current++;
      return { shouldBreak: false, result: result.join('') };
    }
    return { shouldBreak: true, result: result.join('') };
  }

  result.push(maskChar);
  return { shouldBreak: false, result: result.join('') };
};

const applyStringMask = (mask: string, valueChars: string[]): string => {
  const result: string[] = [];
  const valueIndex = { current: 0 };

  for (
    let i = 0;
    i < mask.length && valueIndex.current < valueChars.length;
    i++
  ) {
    const maskChar = mask[i];
    const valueChar = valueChars[valueIndex.current];
    const { shouldBreak, result: newResult } = processStringMaskChar(
      maskChar,
      valueChar,
      result,
      valueIndex
    );

    if (shouldBreak) {
      return newResult;
    }
  }

  return result.join('');
};

const processArrayMaskPattern = (
  pattern: string | RegExp,
  valueChar: string,
  result: string[],
  valueIndex: { current: number }
): { shouldBreak: boolean } => {
  if (typeof pattern === 'string') {
    if (pattern === '9' || pattern === 'a') {
      const isValid =
        pattern === '9' ? isValidDigit(valueChar) : isValidLetter(valueChar);
      if (isValid) {
        result.push(valueChar);
        valueIndex.current++;
        return { shouldBreak: false };
      }
      return { shouldBreak: true };
    }
    result.push(pattern);
    return { shouldBreak: false };
  }

  if (pattern instanceof RegExp) {
    if (pattern.test(valueChar)) {
      result.push(valueChar);
      valueIndex.current++;
      return { shouldBreak: false };
    }
    return { shouldBreak: true };
  }

  return { shouldBreak: false };
};

const applyArrayMask = (
  maskPattern: Array<string | RegExp>,
  valueChars: string[]
): string => {
  const result: string[] = [];
  const valueIndex = { current: 0 };

  for (
    let i = 0;
    i < maskPattern.length && valueIndex.current < valueChars.length;
    i++
  ) {
    const pattern = maskPattern[i];
    const valueChar = valueChars[valueIndex.current];
    const { shouldBreak } = processArrayMaskPattern(
      pattern,
      valueChar,
      result,
      valueIndex
    );

    if (shouldBreak) {
      break;
    }
  }

  return result.join('');
};

export const applyMask = (
  value: string,
  mask: string | Array<string | RegExp>
): string => {
  if (!value) return '';

  const isStringMask = typeof mask === 'string';
  const maskStr = isStringMask ? mask : '';
  const hasLetterMask = maskStr.includes('a');
  const valueChars = extractValueChars(value, hasLetterMask);

  if (valueChars.length === 0) return '';

  if (isStringMask) {
    return applyStringMask(mask as string, valueChars);
  }

  return applyArrayMask(mask as Array<string | RegExp>, valueChars);
};

export const getCursorPosition = (
  oldValue: string,
  newValue: string,
  oldCursorPos: number
): number => {
  const oldLength = oldValue.length;
  const newLength = newValue.length;
  const lengthDiff = newLength - oldLength;

  if (lengthDiff > 0) {
    return Math.min(oldCursorPos + lengthDiff, newLength);
  }

  return Math.min(oldCursorPos, newLength);
};

export const getMaskPattern = (
  mask: string | Array<string | RegExp> | 'currency'
): string | Array<string | RegExp> => {
  if (mask === 'currency') {
    return '999.999.999,99';
  }
  return mask;
};
