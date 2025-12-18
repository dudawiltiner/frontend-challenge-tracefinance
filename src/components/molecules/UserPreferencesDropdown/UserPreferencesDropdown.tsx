'use client';

import { useEffect, useRef, useState } from 'react';

import { useLocale } from '@hooks/navigation';
import { Theme, useTheme } from '@hooks/theme/useTheme.hook';

import { Langs } from '@dictionaries/default-dictionaries';

import {
  ChevronDown,
  ChevronUp,
  Globe,
  Monitor,
  Moon,
  Sun,
} from 'lucide-react';

interface UserPreferencesDropdownProps {
  userName: string;
  companyName: string;
  userInitials: string;
}

export const UserPreferencesDropdown = ({
  userName,
  companyName,
  userInitials,
}: UserPreferencesDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { currentLocale, locales, localeNames, changeLocale } = useLocale();
  const { theme, changeTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLocaleChange = (locale: Langs) => {
    changeLocale(locale);
    setIsOpen(false);
  };

  const handleThemeChange = (newTheme: Theme) => {
    changeTheme(newTheme);
    setIsOpen(false);
  };

  const getThemeIcon = (themeValue: Theme) => {
    switch (themeValue) {
      case 'light':
        return <Sun className="w-4 h-4" />;
      case 'dark':
        return <Moon className="w-4 h-4" />;
      case 'system':
        return <Monitor className="w-4 h-4" />;
    }
  };

  const getThemeLabel = (themeValue: Theme) => {
    switch (themeValue) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-6 py-6 w-full hover:bg-neutral-600 dark:hover:bg-transparent transition-colors"
      >
        <div className="w-10 h-10 bg-avatar-bg rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-avatar-text font-semibold text-sm">
            {userInitials}
          </span>
        </div>
        <div className="flex-1 text-left">
          <p className="text-text-light font-sans font-medium text-sm leading-[1.3] align-middle">
            {userName}
          </p>
          <p className="text-text-tertiary font-sans font-light text-sm leading-[1.3] align-middle">
            {companyName}
          </p>
        </div>
        {isOpen ? (
          <ChevronDown className="w-6 h-6 text-text-light flex-shrink-0" />
        ) : (
          <ChevronUp className="w-6 h-6 text-text-light flex-shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-neutral-800 rounded-lg shadow-xl border border-neutral-700 overflow-hidden z-50">
          <div className="p-2">
            <div className="px-3 py-2 mb-2">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-4 h-4 text-text-secondary" />
                <span className="text-text-light font-sans font-medium text-xs leading-normal">
                  Language
                </span>
              </div>
              <div className="space-y-1">
                {locales.map((locale) => (
                  <button
                    key={locale}
                    onClick={() => handleLocaleChange(locale)}
                    className={`w-full text-left px-3 py-2 rounded transition-colors font-sans text-sm leading-normal ${
                      currentLocale === locale
                        ? 'bg-primary-500/20 text-primary-500'
                        : 'text-text-light hover:bg-neutral-700'
                    }`}
                  >
                    {localeNames[locale]}
                  </button>
                ))}
              </div>
            </div>
            <div className="border-t border-neutral-700 pt-2 mt-2">
              <div className="px-3 py-2">
                <div className="flex items-center gap-2 mb-3">
                  {getThemeIcon(theme)}
                  <span className="text-text-light font-sans font-medium text-xs leading-normal">
                    Theme
                  </span>
                </div>
                <div className="space-y-1">
                  {(['light', 'dark', 'system'] as Theme[]).map(
                    (themeOption) => (
                      <button
                        key={themeOption}
                        onClick={() => handleThemeChange(themeOption)}
                        className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded transition-colors font-sans text-sm leading-normal ${
                          theme === themeOption
                            ? 'bg-primary-500/20 text-primary-500'
                            : 'text-text-light hover:bg-neutral-700'
                        }`}
                      >
                        {getThemeIcon(themeOption)}
                        {getThemeLabel(themeOption)}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
