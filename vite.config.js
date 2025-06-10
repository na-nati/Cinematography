import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // The correct plugin for Vite v4

export default defineConfig({
  plugins: [
    react(), // Place react() plugin first, as it often needs to run before other transformations
    tailwindcss({
      // --- START: Tailwind CSS v4 Configuration ---
      // This is where you define your custom theme values
      theme: {
        extend: { // Use 'extend' to add to default Tailwind theme, or replace 'theme' to override
          colors: {
            'cinematic-dark': '#0A0A0A',
            'cinematic-gray': '#1A1A1A',
            'cinematic-light-gray': '#B0B0B0',
            'accent-gold': '#D4AF37',
            'accent-blue': '#4A90E2',
          },
          // You can also add other theme extensions here, like:
          fontFamily: {
             sans: ['Inter', 'sans-serif'],
             display: ['Playfair Display', 'serif'],
          },
          keyframes: {
            fadeIn: {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 },
            },
            slideUp: {
              '0%': { transform: 'translateY(20px)', opacity: 0 },
              '100%': { transform: 'translateY(0)', opacity: 1 },
            },
            pulseGlow: {
              '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.7)' },
              '50%': { boxShadow: '0 0 15px 5px rgba(212, 175, 55, 0.4)' },
            },
            fillBar: {
              '0%': { width: '0%' },
              '100%': { width: 'var(--skill-width)' },
            }
          },
          animation: {
            fadeIn: 'fadeIn 1s ease-out forwards',
            slideUp: 'slideUp 0.8s ease-out forwards',
            pulseGlow: 'pulseGlow 2s infinite ease-in-out',
            fillBar: 'fillBar 1.5s ease-out forwards',
          },
        },
      },
      // This tells Tailwind which files to scan for utility classes
      // It replaces the 'content' array from v3's tailwind.config.js
      pipeline: {
        css: [
          './index.html', // Include your main HTML file
          './src/**/*.{js,jsx,ts,tsx}', // Scan all JS/JSX/TS/TSX files in src/
        ],
      },
      // --- END: Tailwind CSS v4 Configuration ---
    }),
  ],
});