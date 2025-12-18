'use client';

import React from 'react';

import Image from 'next/image';

import { Menu } from 'lucide-react';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick }) => {
  return (
    <div className="md:hidden bg-header-bg px-4 h-[60px] flex items-center justify-between flex-shrink-0 relative z-30">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onMenuClick();
        }}
        type="button"
        className="p-2 text-header-text hover:bg-neutral-700 rounded-lg transition-colors z-50 relative cursor-pointer"
        aria-label="Abrir menu"
      >
        <Menu className="w-6 h-6" />
      </button>
      <div className="flex items-center">
        <Image
          src="/logo_tracefinance.svg"
          alt="Trace Finance"
          width={165}
          height={22}
          priority
          className="h-5 w-auto"
        />
      </div>
      <div className="w-10" />
    </div>
  );
};
