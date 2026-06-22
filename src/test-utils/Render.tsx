import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

export const RenderWithQueryClient = (
  children: React.ReactNode,
  queryClientInstance?: QueryClient
) => {
  const queryClient =
    queryClientInstance ||
    new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
