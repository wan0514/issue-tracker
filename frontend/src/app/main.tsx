import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from '@tanstack/react-query';
import { isUnauthorized } from '@/shared/utils/isUnauthorized';
import { removeAccessToken } from '@/features/auth/utils/tokens';
import App from '@/app/App';

const ReactQueryDevtools = import.meta.env.DEV
  ? (await import('@tanstack/react-query-devtools')).ReactQueryDevtools
  : () => null;

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => {
      if (isUnauthorized(error)) {
        removeAccessToken();
        window.location.href = '/login';
      }
    },
  }),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </StrictMode>,
);
