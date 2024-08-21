import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass'
import federation from "@originjs/vite-plugin-federation"
const { dependencies } = require("./package.json")

export default defineConfig({
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  plugins: [
    react(),
    federation({
      name: "product",
      filename: "product-app.js",
      remotes: {},
      exposes: {
        "./ProductApp": "./src/App.tsx",
        "./ProductCard": "./src/components/ProductCard.tsx"
      }, 
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          version: dependencies.react
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: dependencies["react-router-dom"],
        },
      }
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
})
