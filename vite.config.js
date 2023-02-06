import { defineConfig } from "vite";

export default defineConfig({
  publicDir: process.cwd() + "/public",
  root: process.cwd() + "/src",
  build: {
    outDir: process.cwd() + "/dist",
    rollupOptions: {
      input: {
        main: process.cwd() + "/src/index.html",
        city: process.cwd() + "/src/city/index.html",
      },
    },
  },
});
