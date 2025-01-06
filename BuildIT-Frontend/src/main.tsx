import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './utils/i18n.ts'
import 'dotenv/config'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback="loading">
      <App />
    </Suspense>
  </StrictMode>,
)
