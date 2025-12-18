'use client';

import React from 'react';

import Image from 'next/image';

import { UserPreferencesDropdown } from '@molecules/UserPreferencesDropdown';

import { Check } from 'lucide-react';

import { SidebarProps } from './Sidebar.types';

export const Sidebar: React.FC<SidebarProps> = ({
  steps,
  currentStep,
  className = '',
}) => {
  return (
    <div
      className={`bg-sidebar-bg text-sidebar-text h-screen md:h-screen w-full md:w-64 flex flex-col md:flex-col flex-shrink-0 ${className}`}
    >
      <div className="mb-4 md:mb-8 p-4 md:p-6">
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
        <ul className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-0 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <li
                key={step.id}
                className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3 flex-shrink-0"
              >
                <div className="flex flex-col md:flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors relative ${
                      isActive || !isCompleted
                        ? 'bg-sidebar-item-inactive'
                        : 'bg-primary-500'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5 text-black" />
                    ) : isActive ? (
                      <div className="w-2.5 h-2.5 bg-primary-500 rounded-full" />
                    ) : null}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`hidden md:block w-0.5 h-12 ${
                        isCompleted
                          ? 'bg-primary-500'
                          : 'bg-sidebar-item-inactive'
                      }`}
                    />
                  )}
                </div>
                <div className="flex mt-0 md:mt-1">
                  <p
                    className={`font-sans font-medium text-xs md:text-sm leading-[1.3] align-top text-center md:text-left whitespace-nowrap ${
                      isActive || isCompleted
                        ? 'text-text-light'
                        : 'text-neutral-400'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto bg-sidebar-item-inactive hidden md:block">
        <UserPreferencesDropdown
          userName="Evandro"
          companyName="Trace Finance"
          userInitials="EM"
        />
      </div>
    </div>
  );
};
