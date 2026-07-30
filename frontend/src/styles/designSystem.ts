/**
 * BankSarthi Design System - Premium Banking UI Tokens
 * Inspired by: Apple Wallet, Revolut, CRED, Stripe, Google Wallet, Monzo, PhonePe
 */

// ============================================================================
// COLOR PALETTE - Premium Banking Aesthetic
// ============================================================================

export const colors = {
  // Primary Colors
  primary: {
    50: '#f0f5ff',
    100: '#e0ebff',
    200: '#c7d9ff',
    300: '#a8c5ff',
    400: '#85adff',
    500: '#5B8FFF', // Primary Brand Blue
    600: '#4873E8',
    700: '#3a5ac9',
    800: '#2f42a0',
    900: '#2a3880',
    950: '#1a2357',
  },

  // Secondary Colors - Soft & Modern
  secondary: {
    50: '#f8fafb',
    100: '#f1f3f5',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#868e96',
    700: '#495057',
    800: '#343a40',
    900: '#212529',
  },

  // Accent Colors
  accent: {
    cyan: '#00d4ff',
    emerald: '#10b981',
    sky: '#0ea5e9',
    amber: '#f59e0b',
    rose: '#f43f5e',
  },

  // Semantic Colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#0ea5e9',

  // Neutrals
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #5B8FFF 0%, #00d4ff 100%)',
    success: 'linear-gradient(135deg, #10b981 0%, #6ee7b7 100%)',
    premium: 'linear-gradient(135deg, #5B8FFF 0%, #6366f1 50%, #00d4ff 100%)',
    warm: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
    dark: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
  },
};

// ============================================================================
// TYPOGRAPHY SCALE - Premium & Readable
// ============================================================================

export const typography = {
  fontFamily: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    display: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
  },

  // Display & Heading Scales
  display: {
    xl: {
      fontSize: '4rem',
      lineHeight: '1.1',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    lg: {
      fontSize: '3rem',
      lineHeight: '1.15',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    md: {
      fontSize: '2.25rem',
      lineHeight: '1.2',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
  },

  heading: {
    h1: {
      fontSize: '2rem',
      lineHeight: '1.25',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '1.5rem',
      lineHeight: '1.3',
      fontWeight: 600,
      letterSpacing: '-0.005em',
    },
    h3: {
      fontSize: '1.25rem',
      lineHeight: '1.4',
      fontWeight: 600,
      letterSpacing: '0',
    },
    h4: {
      fontSize: '1.125rem',
      lineHeight: '1.4',
      fontWeight: 600,
      letterSpacing: '0',
    },
    h5: {
      fontSize: '1rem',
      lineHeight: '1.5',
      fontWeight: 600,
      letterSpacing: '0',
    },
    h6: {
      fontSize: '0.875rem',
      lineHeight: '1.5',
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
  },

  // Body Text
  body: {
    lg: {
      fontSize: '1.125rem',
      lineHeight: '1.5',
      fontWeight: 400,
    },
    base: {
      fontSize: '1rem',
      lineHeight: '1.5',
      fontWeight: 400,
    },
    sm: {
      fontSize: '0.875rem',
      lineHeight: '1.5',
      fontWeight: 400,
    },
    xs: {
      fontSize: '0.75rem',
      lineHeight: '1.4',
      fontWeight: 500,
    },
  },

  // Caption & Labels
  caption: {
    fontSize: '0.75rem',
    lineHeight: '1.4',
    fontWeight: 500,
    letterSpacing: '0.5px',
  },

  label: {
    fontSize: '0.875rem',
    lineHeight: '1.5',
    fontWeight: 600,
    letterSpacing: '0.5px',
  },
};

// ============================================================================
// SPACING SCALE - 8px Base Unit
// ============================================================================

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
};

// ============================================================================
// ELEVATION SYSTEM - Glassmorphism & Depth
// ============================================================================

export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.08), 0 1px 3px 0 rgba(0, 0, 0, 0.08)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
  
  // Glass shadows for glassmorphism
  glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  
  // Inner shadows for depth
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  
  // Premium card shadows
  card: '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
  cardHover: '0 12px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06)',
};

// ============================================================================
// BORDER RADIUS - Modern & Friendly
// ============================================================================

export const borderRadius = {
  none: '0',
  xs: '0.25rem',
  sm: '0.5rem',
  base: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
  '3xl': '3rem',
  full: '9999px',
};

// ============================================================================
// TRANSITIONS & ANIMATIONS
// ============================================================================

export const transitions = {
  fast: '150ms ease-in-out',
  base: '250ms ease-in-out',
  slow: '350ms ease-in-out',
  slower: '500ms ease-in-out',
};

export const animations = {
  fadeIn: 'fadeIn 300ms ease-in-out',
  slideUp: 'slideUp 300ms ease-out',
  slideDown: 'slideDown 300ms ease-out',
  slideLeft: 'slideLeft 300ms ease-out',
  slideRight: 'slideRight 300ms ease-out',
  pulse: 'pulse 2s ease-in-out infinite',
  float: 'float 3s ease-in-out infinite',
  glow: 'glow 2s ease-in-out infinite',
  shimmer: 'shimmer 2s ease-in-out infinite',
};

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const mediaQueries = {
  xs: '(min-width: 320px)',
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

// ============================================================================
// Z-INDEX LAYERS
// ============================================================================

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
  notification: 1070,
};

// ============================================================================
// THEME - Light Mode (Primary)
// ============================================================================

export const lightTheme = {
  bg: {
    primary: colors.white,
    secondary: colors.gray[50],
    tertiary: colors.gray[100],
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
  text: {
    primary: colors.gray[900],
    secondary: colors.gray[700],
    tertiary: colors.gray[600],
    muted: colors.gray[500],
    inverse: colors.white,
  },
  border: {
    primary: colors.gray[200],
    secondary: colors.gray[100],
  },
};

// ============================================================================
// EXPORT DEFAULT DESIGN SYSTEM
// ============================================================================

export const designSystem = {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  transitions,
  animations,
  breakpoints,
  mediaQueries,
  zIndex,
  lightTheme,
};

export default designSystem;
