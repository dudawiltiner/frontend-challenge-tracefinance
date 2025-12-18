import { useCallback, useEffect, useRef } from 'react';

import {
  applyMask,
  getCursorPosition,
  getMaskPattern,
} from './InputMask.functions';

interface UseInputMaskProps {
  mask: string | Array<string | RegExp> | 'currency';
  value: string | number | undefined | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const useInputMask = ({
  mask,
  value,
  onChange,
  inputRef,
}: UseInputMaskProps) => {
  const isComposingRef = useRef(false);
  const maskPattern = getMaskPattern(mask);
  const displayValue =
    value !== undefined && value !== null ? String(value) : '';

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isComposingRef.current) {
        if (onChange) onChange(e);
        return;
      }

      const input = e.target;
      const cursorPos = input.selectionStart || 0;
      const oldValue = displayValue;
      const newValue = e.target.value;

      const maskedValue = applyMask(newValue, maskPattern);

      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: maskedValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      if (inputRef.current) {
        inputRef.current.value = maskedValue;

        setTimeout(() => {
          if (inputRef.current) {
            const newCursorPos = getCursorPosition(
              oldValue,
              maskedValue,
              cursorPos
            );
            inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
          }
        }, 0);
      }

      if (onChange) {
        onChange(syntheticEvent);
      }
    },
    [displayValue, maskPattern, onChange, inputRef]
  );

  const handleCompositionStart = useCallback(() => {
    isComposingRef.current = true;
  }, []);

  const handleCompositionEnd = useCallback(
    (e: React.CompositionEvent<HTMLInputElement>) => {
      isComposingRef.current = false;
      handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
    },
    [handleChange]
  );

  return {
    displayValue,
    handleChange,
    handleCompositionStart,
    handleCompositionEnd,
  };
};

export const useInputRef = (
  ref: React.ForwardedRef<HTMLInputElement>,
  inputRef: React.RefObject<HTMLInputElement>
) => {
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(inputRef.current);
      } else {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current =
          inputRef.current;
      }
    }
  }, [ref, inputRef]);
};
