import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@assets': '/src/assets',
      '@ui': '/src/components/UI',
      '@icons': '/src/components/UI/Icons',
      '@hooks': '/src/hooks'
    }
  }
});
