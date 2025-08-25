// Library
import type { ReactNode } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/*-----------------------------------------------------------------------------------*/

const queryClient = new QueryClient();

export function renderWithClient(
    ui: ReactNode,
    options?: Omit<RenderOptions, "wrapper">
) {
    return render(
        <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
        options
    );
}
