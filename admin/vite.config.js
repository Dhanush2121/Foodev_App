import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export const API_URL = "https://backend-69el.onrender.com/";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
