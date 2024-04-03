import { QueryClient } from "@tanstack/react-query";

export default new QueryClient({ 
  defaultOptions: { 
    queries: { 
      gcTime: 60 * 1000, 
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false, 
      refetchOnReconnect: false,
      refetchOnMount: false, 
      retryOnMount: false, 
      retry: false,
    }
  } 
})