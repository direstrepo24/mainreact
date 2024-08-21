import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './assets/styles/styles.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <BrowserRouter basename="/products">
    <App />
  </BrowserRouter>
</React.StrictMode>,
)
