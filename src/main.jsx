import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './Routes/Routes';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './Providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a QueryClient instance
const queryClient = new QueryClient();

// Function to prevent right-click context menu
const disableRightClick = (e) => {
  e.preventDefault();
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div onContextMenu={disableRightClick}>
      <AuthProvider>
        {/* Wrap the app with QueryClientProvider */}
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  </React.StrictMode>
);
