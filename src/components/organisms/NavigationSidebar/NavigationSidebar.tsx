'use client';

import React, { useEffect } from 'react';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { UserPreferencesDropdown } from '@molecules/UserPreferencesDropdown';

import { ArrowLeftRight, ChevronRight, X } from 'lucide-react';

import { NavigationSidebarProps } from './NavigationSidebar.types';

const INACTIVE_TEXT_COLOR = 'text-neutral-400';

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  className = '',
  isOpen = false,
  onClose,
}) => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('transactions.navigation');
  const isTransactionsActive = pathname?.includes('/transactions');

  useEffect(() => {
    if (isOpen && onClose) {
      onClose();
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`bg-sidebar-bg text-sidebar-text min-h-screen w-[80vw] max-w-[320px] md:w-64 md:max-w-none flex flex-col fixed md:relative z-[70] md:z-auto left-0 top-0 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${className}`}
        style={{
          willChange: 'transform',
        }}
      >
        {/* Close button mobile */}
        {isOpen && (
          <div className="md:hidden flex items-center justify-between p-4 mb-4">
            <Image
              src="/logo_tracefinance.svg"
              alt="Trace Finance"
              width={165}
              height={22}
              priority
              className="h-5 w-auto"
            />
            <button
              onClick={onClose}
              className="p-2 text-sidebar-text hover:bg-sidebar-item-active rounded-lg transition-colors"
              aria-label={t('closeMenu')}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Logo desktop */}
        <div className="hidden md:block mb-4 md:mb-8 p-4 md:p-6">
          <div className="flex items-center justify-center md:justify-start">
            <Image
              src="/logo_tracefinance.svg"
              alt="Trace Finance"
              width={165}
              height={22}
              priority
              className="w-32 md:w-auto"
            />
          </div>
        </div>

        <nav className="flex-1 px-4 md:px-6">
          <Link
            href={`/${locale}/transactions`}
            onClick={handleLinkClick}
            className={`flex items-center justify-between rounded-lg mb-2 transition-colors ${
              isTransactionsActive
                ? 'bg-sidebar-item-active border-l-[5px] border-primary-500 pt-4 md:pt-6 pr-4 md:pr-8 pb-4 md:pb-6 pl-4 md:pl-8'
                : `${INACTIVE_TEXT_COLOR} hover:bg-sidebar-item-active px-3 md:px-4 py-2 md:py-3`
            }`}
          >
            <div className="flex items-center gap-[10px]">
              <ArrowLeftRight
                className={`w-5 h-5 ${isTransactionsActive ? 'text-primary-500' : INACTIVE_TEXT_COLOR}`}
              />
              <span
                className={`font-sans font-normal text-base leading-[1.3] align-middle ${
                  isTransactionsActive ? 'text-text-light' : INACTIVE_TEXT_COLOR
                }`}
              >
                {t('transactions')}
              </span>
            </div>
            <ChevronRight
              className={`w-5 h-5 ${isTransactionsActive ? 'text-text-light' : INACTIVE_TEXT_COLOR}`}
            />
          </Link>
        </nav>

        <div className="mt-auto bg-sidebar-item-inactive">
          <UserPreferencesDropdown
            userName="Evandro"
            companyName="Trace Finance"
            userInitials="EM"
          />
        </div>
      </div>
    </>
  );
};
