import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  base: '/https://samundra-shrestha.github.io/odin-library/',
  plugins: [
    tailwindcss(),
  ],
})