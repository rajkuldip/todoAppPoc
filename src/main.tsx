// Library
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Component
import { App } from './App.tsx';

// Base Style
import './global.css';

/*-----------------------------------------------------------------------------------*/

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
