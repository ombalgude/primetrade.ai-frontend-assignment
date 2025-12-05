import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Modern Paper Workspace theme
        paper: '#FAF7F2',
        ink: '#1B1B1B',
        'soft-gray': '#7A7A7A',
        'accent-blue': '#5673FF',
        'accent-green': '#2EC4B6',
        'kraft-brown': '#C7A580',
        
        // Legacy colors (kept for compatibility)
        background: '#FAF7F2',
        'background-light': '#F5F2ED',
        text: '#1B1B1B',
        'text-dark': '#7A7A7A',
        primary: '#5673FF',
        'primary-dark': '#3D52B0',
        secondary: '#2EC4B6',
        'secondary-dark': '#1FA39D',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        hand: ['var(--font-hand)', 'Patrick Hand', 'Comic Sans MS', 'cursive'],
      },
      boxShadow: {
        card: '0 4px 12px rgba(27, 27, 27, 0.08)',
        'card-hover': '0 8px 24px rgba(27, 27, 27, 0.12)',
        'ink-light': '0 2px 6px rgba(27, 27, 27, 0.05)',
      },
      backgroundImage: {
        'paper-texture': "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\"><filter id=\"noise\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" result=\"noise\" /></filter><rect width=\"100\" height=\"100\" fill=\"%23FAF7F2\" /><rect width=\"100\" height=\"100\" fill=\"%23000000\" opacity=\"0.02\" filter=\"url(%23noise)\" /></svg>')",
        'ruled-lines': "repeating-linear-gradient(transparent, transparent 28px, rgba(86, 115, 255, 0.03) 28px, rgba(86, 115, 255, 0.03) 29px)",
      },
      keyframes: {
        'card-hover': {
          '0%': { transform: 'translateY(0px)', boxShadow: '0 4px 12px rgba(27, 27, 27, 0.08)' },
          '100%': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(27, 27, 27, 0.12)' },
        },
        'sticky-drop': {
          '0%': { opacity: '0', transform: 'translateY(-20px) rotate(-2deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotate(0deg)' },
        },
        'paper-tear': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
      },
      animation: {
        'card-hover': 'card-hover 200ms ease-out',
        'sticky-drop': 'sticky-drop 320ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        'paper-tear': 'paper-tear 300ms ease-out',
      },
      transitionDuration: {
        120: '120ms',
        320: '320ms',
      },
      transitionTimingFunction: {
        'soft': 'cubic-bezier(.2,.9,.3,1)',
      },
    },
  },
  plugins: [],
};
export default config;
