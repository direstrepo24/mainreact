# REACT - VITE - MICROFRONTEND

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

### Commands: OrdersApp

#### Create APPS

1. npm create vite@latest ecommerce-products -- --template react-ts
2. npm install -D tailwindcss postcss autoprefixer sass sass-loader 
3. npm install react-router-dom  --save
4. npm install  inversify reflect-metadata --save
5. npx tailwindcss init 
- DOCS:  https://tailwindcss.com/docs/guides/vite#react
* 	Tailwind CSS:
    * Marco de diseño de utilidad para construir interfaces de usuario.
    * Proporciona clases utilitarias predefinidas para diseñar componentes y páginas.
    * Se centra en un enfoque de "bajo nivel" que te permite construir estilos rápidamente.
* 		PostCSS:
    * Herramienta de procesamiento de CSS que transforma estilos con JavaScript y plugins.
    * Utilizado para aplicar transformaciones como la incorporación de variables, autoprefijado, y más.
    * Tailwind utiliza PostCSS para procesar su configuración y clases utilitarias en estilos CSS.
* 		Autoprefixer:
    * Plugin de PostCSS que agrega automáticamente prefijos de proveedores a reglas CSS.
    * Mejora la compatibilidad entre navegadores al evitar la escritura manual de prefijos de proveedores.
    * Ayuda a garantizar que los estilos generados sean consistentes en diferentes navegadores.

6. Configuration file tailwind.config.js: 
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} 
```

7. Configuration file tailwind css:
- Create file name styles.scss
- Add content:
```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```
8. Configuration file postcss.config.js
```js
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss,
    autoprefixer,
    // Otros plugins de PostCSS si los necesitas
  ],
};
```
9. Configuration Sass in file vite.config.ts:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
});
```
10. Module federation :
- npm install @originjs/vite-plugin-federation --save-dev
  Config federation in file vite.config.ts:
```js
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

```