import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { Toaster } from "@/components/ui/sonner.tsx";
import App from "./App.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * This is the main query client for the monitoring system.
 * It is used to create a query client and the query client provider.
 * It is used to configure the query client and the query client provider.
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Limit retry attempts
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster richColors />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
