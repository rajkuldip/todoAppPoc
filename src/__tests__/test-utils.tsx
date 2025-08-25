// Library
import type { ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, type DefaultTheme } from "styled-components";

/*-----------------------------------------------------------------------------------*/

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const testTheme: DefaultTheme = {
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

export function renderWithClient(
    ui: ReactNode,
    options?: Omit<RenderOptions, "wrapper">
) {
    queryClient.clear();

    const Wrapper = ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={testTheme}>{children}</ThemeProvider>
        </QueryClientProvider>
    );

    return render(ui, { wrapper: Wrapper, ...options });
}