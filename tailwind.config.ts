import type { Config } from 'tailwindcss';

import { colors } from './src/design-tokens/colors';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
        },
        neutral: {
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
        },
        background: {
          light: 'var(--color-bg-light)',
          gray: 'var(--color-bg-gray)',
          dark: 'var(--color-bg-dark)',
          card: 'var(--color-bg-card)',
          'card-dark': 'var(--color-bg-card-dark)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          placeholder: 'var(--color-text-placeholder)',
          light: 'var(--color-text-light)',
          dark: 'var(--color-text-dark)',
        },
        status: {
          success: {
            bg: 'var(--color-status-success-bg)',
            text: 'var(--color-status-success-text)',
          },
          warning: {
            bg: 'var(--color-status-warning-bg)',
            text: 'var(--color-status-warning-text)',
          },
          error: {
            bg: 'var(--color-status-error-bg)',
            text: 'var(--color-status-error-text)',
          },
        },
        border: {
          light: 'var(--color-border-light)',
          default: 'var(--color-border-default)',
          input: 'var(--color-border-input)',
          dark: 'var(--color-border-dark)',
        },
        avatar: {
          bg: 'var(--color-avatar-bg)',
          text: 'var(--color-avatar-text)',
        },
        sidebar: {
          bg: 'var(--color-sidebar-bg)',
          'item-active': 'var(--color-sidebar-item-active)',
          'item-inactive': 'var(--color-sidebar-item-inactive)',
          text: 'var(--color-sidebar-text)',
          'text-secondary': 'var(--color-sidebar-text-secondary)',
          icon: 'var(--color-sidebar-icon)',
        },
        header: {
          bg: 'var(--color-header-bg)',
          text: 'var(--color-header-text)',
        },
        filterPanel: {
          bg: 'var(--color-filter-panel-bg)',
          selected: 'var(--color-filter-panel-selected)',
          hover: 'var(--color-filter-panel-hover)',
          icon: 'var(--color-filter-panel-icon)',
          text: 'var(--color-filter-panel-text)',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
