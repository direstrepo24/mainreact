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
      name: 'host',
      remotes: {
        order: 'http://localhost:5174/assets/remoteEntry.js', // Asegúrate de reemplazar la URL con la ubicación correcta del remoteEntry.js de tu aplicación remote.
        product: "http://localhost:5173/assets/product-app.js"
      },
      shared: {
        
        react: { 
          requiredVersion: packageJson.dependencies.react, 
          // No es necesario especificar singleton aquí, se maneja automáticamente
        },
        "react-dom": {
          requiredVersion: packageJson.dependencies["react-dom"], 
          // Igual que con React, no es necesario especificar singleton
        },
        "react-router-dom": {
       
          requiredVersion: packageJson.dependencies["react-router-dom"],
        },
        // Añade más dependencias compartidas según sea necesario
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  }
})
