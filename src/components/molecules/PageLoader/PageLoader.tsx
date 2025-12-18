'use client';

import React from 'react';

export const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 dark:bg-[#121212] backdrop-blur-md animate-in fade-in duration-200">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-primary-500/10 rounded-full"></div>

          <div className="absolute inset-2 border-4 border-primary-500/20 rounded-full"></div>

          <div
            className="absolute inset-4 border-4 border-transparent border-t-primary-500 border-r-primary-500 rounded-full animate-spin"
            style={{ animationDuration: '0.8s' }}
          ></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <p className="font-sans font-normal text-sm text-text-secondary">
            Carregando
          </p>
          <div className="flex gap-1">
            <span
              className="w-1 h-1 bg-primary-500 rounded-full animate-bounce"
              style={{ animationDelay: '0s' }}
            ></span>
            <span
              className="w-1 h-1 bg-primary-500 rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></span>
            <span
              className="w-1 h-1 bg-primary-500 rounded-full animate-bounce"
              style={{ animationDelay: '0.4s' }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};
