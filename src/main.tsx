// Library
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, type DefaultTheme } from 'styled-components';

// Component
import { App } from './App.tsx';

// Base Style
import './global.css';

/*-----------------------------------------------------------------------------------*/

const theme: DefaultTheme = {
  colors: {
    primary: '#4f46e5',
    secondary: '#6366f1',
    background: '#f8f9fa',
    hoverBackground: '#f1f3f5',
    text: '#212529',
    lightText: '#495057',
    completed: '#868e96',
    primaryButton: '#1c7ed6',
    primaryButtonHover: '#1971c2',
    primaryButtonDisabled: '#a5d8ff',
    footerBackground: '#f1f1f1',
    headerBackground: '#4a90e2',
  },
  width: {
    content: '1024px',
    subHeading: '800px'
  }
};

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
