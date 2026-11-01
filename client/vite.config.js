import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../dist', // Outputs the build directly to the project root
    emptyOutDir: true,
  },
});