export const colors = {
  primary: {
    50: '#E5FEF7',
    100: '#CCFDF0',
    500: '#00F2B1',
    600: '#00D9A0',
    700: '#00C896',
  },

  neutral: {
    50: '#F2F3F5',
    100: '#E8E9ED',
    200: '#D8DAE0',
    300: '#949494',
    400: '#7C8597',
    500: '#4A505B',
    600: '#363636',
    700: '#252525',
    800: '#25282D',
    900: '#121212',
  },

  background: {
    light: '#FFFFFF',
    gray: '#F2F3F5',
    dark: '#121212',
    card: '#FFFFFF',
    cardDark: '#252525',
  },

  text: {
    primary: '#25282D',
    secondary: '#7C8597',
    tertiary: '#949494',
    placeholder: '#A3AAB6',
    light: '#F3F3F3',
    dark: '#000000',
  },

  status: {
    success: {
      background: '#E7F8F2',
      text: '#0A6F4D',
    },
    warning: {
      background: '#FFFBED',
      text: '#977F2E',
    },
    error: {
      background: '#FEE2E2',
      text: '#DC2626',
    },
  },

  border: {
    light: '#E5E7EB',
    default: '#D1D5DB',
    input: '#D8DAE0',
    dark: '#363636',
  },

  avatar: {
    background: '#7EE9FF',
    text: '#000000',
  },
} as const;

export type ColorToken = typeof colors;
