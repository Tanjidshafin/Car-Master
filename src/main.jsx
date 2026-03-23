
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppContextProvider from './context/AppContext.jsx'
import { VendorProvider } from './context/VendorContext.jsx'
import { BrowserRouter } from 'react-router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppContextProvider>
        <VendorProvider>
        <App />
        </VendorProvider>
      </AppContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
  ,
)
