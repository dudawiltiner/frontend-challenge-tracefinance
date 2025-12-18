'use client';

interface FilterActionsProps {
  onClear?: () => void;
  onApply: () => void;
  t: (key: string) => string;
}

export const FilterActions = ({ onClear, onApply, t }: FilterActionsProps) => {
  return (
    <div className="absolute bottom-4 right-4 left-4 flex justify-end gap-2 pt-4 border-t border-neutral-200 bg-background-light">
      {onClear && (
        <button
          onClick={onClear}
          className="px-4 py-2 border border-border-input/50 text-text-primary rounded-lg hover:bg-neutral-100 font-sans font-medium text-xs leading-[1.3] text-center align-middle"
        >
          {t('clear')}
        </button>
      )}
      <button
        onClick={onApply}
        className="px-4 py-2 bg-primary-500 text-text-dark rounded-lg hover:bg-primary-600 font-sans font-medium text-xs leading-[1.3] text-center align-middle"
      >
        {t('apply')}
      </button>
    </div>
  );
};
