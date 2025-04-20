/**
 * FPL AI Manager Theme Utilities
 * 
 * Central location for theme constants and utility functions
 * to ensure consistent styling throughout the application.
 */

// Core FPL brand colors
export const COLORS = {
  fplPurple: '#37003c',
  fplGreen: '#00ff87',
  white: '#ffffff',
  lightGray: '#f9fafb',
};

// Header styles for consistent headers
export const HEADER_STYLES = {
  gradient: 'bg-gradient-to-r from-fpl-purple to-fpl-purple/90',
  text: 'text-white',
  padding: 'p-4',
};

// Button variant styles
export const BUTTON_VARIANTS = {
  primary: 'bg-fpl-green text-fpl-purple font-bold hover:bg-fpl-green/90',
  secondary: 'bg-fpl-purple text-white font-bold hover:bg-fpl-purple/90',
  outline: 'border-2 border-fpl-purple text-fpl-purple hover:bg-fpl-purple/5 font-bold',
};

// Card styles
export const CARD_STYLES = {
  container: 'rounded-lg border border-gray-200 shadow-sm overflow-hidden p-0 flex flex-col',
  header: 'bg-gradient-to-r from-fpl-purple to-fpl-purple/90 text-white p-4 m-0',
  content: 'p-4',
};

// Text styles
export const TEXT_STYLES = {
  heading: 'font-bold text-fpl-purple',
  subheading: 'text-fpl-purple/70',
  body: 'text-gray-700',
  value: 'text-2xl font-bold text-fpl-purple',
};

// Z-index values
export const Z_INDEX = {
  header: 10,
  sidebar: 20,
  modal: 50,
  tooltip: 40,
};

// Function to compose Tailwind classes conditionally
export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
