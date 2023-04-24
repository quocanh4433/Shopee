import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer() as any],
  server: {
    port: 4433
  },
  test: {
    environment: 'jsdom',
    setupFiles: path.resolve(__dirname, './vitest.setup.js')
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
});
