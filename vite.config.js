import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Polling makes saves show up on setups where file watching fails (WSL, OneDrive, network drives)
  server: { watch: { usePolling: true, interval: 300 } },
});
