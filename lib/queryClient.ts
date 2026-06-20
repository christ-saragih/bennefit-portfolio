import { QueryClient } from "@tanstack/react-query";

// Portfolio content changes rarely, so cache aggressively and avoid noisy refetches.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min "fresh" before refetch
      gcTime: 1000 * 60 * 30, // keep unused data 30 min
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
