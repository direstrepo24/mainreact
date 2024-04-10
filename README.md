# React + TypeScript + Vite


#### Create APPS

1. yarn create vite - seleccionar react y typescript
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
- Crear archivo con nombre styles.scss dentro de src
- Adicionar el siguiente contenido:
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
10. Module federation - add apps:
- npm install @originjs/vite-plugin-federation --save-dev
  Config federation in file vite.config.ts:
```js
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
        product: "http://localhost:5173/assets/product-app.js" //puedo colocar el remoteEntry.js genérico o el nombre personalizado en el remote en filename: "product-app.js", 
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


```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
