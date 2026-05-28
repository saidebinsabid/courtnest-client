import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/Routes.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Optimized QueryClient — reduces unnecessary API calls significantly
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,       // 5 min: এই সময়ের মধ্যে same data আবার fetch হবে না
      gcTime: 10 * 60 * 1000,          // 10 min: unused data cache-এ থাকবে
      refetchOnWindowFocus: false,      // tab switch করলে refetch বন্ধ
      refetchOnMount: false,            // component remount-এ refetch বন্ধ (stale না হলে)
      retry: 1,                         // failed request মাত্র ১ বার retry
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer></ToastContainer>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
