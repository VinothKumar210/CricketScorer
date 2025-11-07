import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

// Singleton QueryClient reference to allow invalidation from utility hooks
const queryClient = new QueryClient();

// Basic safe fetch helper that falls back to empty data on failure
async function safeFetch<T>(url: string, init?: RequestInit, fallback: T): Promise<T> {
  try {
    const res = await fetch(url, init);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

// Very small tRPC-like facade powered by React Query
export const trpc = {
  useUtils() {
    return {
      matches: {
        getAll: {
          invalidate: () => queryClient.invalidateQueries({ queryKey: ["matches"] }),
        },
      },
    };
  },
  matches: {
    getAll: {
      useQuery: () =>
        useQuery({
          queryKey: ["matches"],
          queryFn: () => safeFetch("/api/matches", undefined, [] as any[]),
        }),
    },
    create: {
      useMutation: (opts?: { onSuccess?: () => void }) =>
        useMutation({
          mutationFn: async (input: any) =>
            safeFetch(
              "/api/matches",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input),
              },
              {}
            ),
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["matches"] });
            opts?.onSuccess?.();
          },
        }),
    },
  },
};

// Re-export the client so the app root can use the same instance
export { queryClient };
