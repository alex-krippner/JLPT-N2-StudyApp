import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { MonProvider } from "@mon/mon-ui-kit";

const queryClient: QueryClient = new QueryClient();

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MonProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </MonProvider>
    </QueryClientProvider>
  );
}

export default AppProviders;
