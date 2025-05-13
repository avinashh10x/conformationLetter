import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MyProvider } from './context/LetterContext.jsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </MyProvider>
  </StrictMode>,
)
