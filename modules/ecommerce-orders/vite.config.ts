import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass'
import federation from "@originjs/vite-plugin-federation"
import packageJson from "./package.json"; // Importa el package.json

// https://vitejs.dev/config/
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
      name: "order",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./OrderApp": "./src/App.tsx",
      }, 
      shared: {
        ...packageJson.dependencies,
        react: {
         
          version: packageJson.dependencies.react
        },
        "react-dom": {
      
          requiredVersion: packageJson.dependencies["react-dom"],
        },
        "react-router-dom": {
       
          requiredVersion: packageJson.dependencies["react-router-dom"],
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
