'use client';

interface FormActionsProps {
  isFormValid: boolean;
  isLoading: boolean;
  onBack: () => void;
  t: (key: string) => string;
}

export const FormActions = ({
  isFormValid,
  isLoading,
  onBack,
  t,
}: FormActionsProps) => {
  return (
    <div className="flex justify-between mt-8">
      <button
        type="button"
        onClick={onBack}
        className="px-4 py-2 border-2 border-primary-500 bg-transparent hover:bg-primary-50 dark:hover:bg-neutral-800 rounded-lg font-sans font-medium text-sm leading-normal text-center align-middle text-text-dark dark:text-white transition-colors"
      >
        {t('buttons.back')}
      </button>
      <button
        type="submit"
        disabled={isLoading || !isFormValid}
        className={`px-4 py-2 rounded-lg font-sans font-medium text-sm leading-normal text-center align-middle transition-colors ${
          isLoading || !isFormValid
            ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
            : 'bg-primary-500 hover:bg-primary-600 text-text-dark'
        }`}
      >
        {isLoading ? t('buttons.sending') : t('buttons.send')}
      </button>
    </div>
  );
};
