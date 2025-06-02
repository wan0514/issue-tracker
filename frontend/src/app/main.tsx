import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from '@tanstack/react-query';
import { isUnauthorized } from '@/shared/utils/isUnauthorized';
import { removeAccessToken } from '@/features/auth/utils/tokens';
import App from '@/app/App';

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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
