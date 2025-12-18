'use client';

import React from 'react';

import { SidebarStep } from '@molecules/Sidebar/Sidebar.types';

import { Check } from 'lucide-react';

interface StepperMobileProps {
  steps: SidebarStep[];
  currentStep: number;
}

export const StepperMobile: React.FC<StepperMobileProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="md:hidden bg-sidebar-bg px-4 py-3 border-b border-neutral-200">
      <nav className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center overflow-x-auto w-full">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <React.Fragment key={`circle-${step.id}`}>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
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
                    className={`h-0.5 flex-1 min-w-[48px] max-w-[80px] flex-shrink-0 ${
                      isCompleted
                        ? 'bg-primary-500'
                        : 'bg-sidebar-item-inactive'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div className="flex items-center justify-center overflow-x-auto w-full mt-2">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <React.Fragment key={`text-${step.id}`}>
                <div className="flex items-center justify-center flex-shrink-0 min-w-[24px]">
                  <p
                    className={`font-sans font-medium text-xs leading-[1.3] text-center whitespace-nowrap ${
                      isActive || isCompleted
                        ? 'text-text-light'
                        : 'text-neutral-400'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 min-w-[48px] max-w-[80px] flex-shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
