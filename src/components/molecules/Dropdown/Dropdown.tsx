'use client';

import React, { useEffect, useRef } from 'react';

import { DropdownProps } from './Dropdown.types';

export const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  children,
  trigger,
  className = '',
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {trigger}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-[300px]">
          {children}
        </div>
      )}
    </div>
  );
};
