import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Removed Tailwind directives; using CDN for styles
// import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
