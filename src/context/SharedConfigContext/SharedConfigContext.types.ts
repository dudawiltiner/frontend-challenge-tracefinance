import { Langs } from '@dictionaries/default-dictionaries';

export interface SharedConfigContextProps {
  lang: Langs;
  mode: 'dark' | 'light';
  setMode: (mode: 'dark' | 'light') => void;
  savedMode: 'system' | 'dark' | 'light';
  setSavedMode: (mode: 'system' | 'dark' | 'light') => void;
  handleThemeMode: (
    event: React.MouseEvent<HTMLElement>,
    mode: string | null
  ) => void;
}

export interface SharedConfigProviderProps {
  children: React.ReactNode;
}
