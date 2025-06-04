import { useEffect } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@/shared/styles/ThemeProvider';
import { ThemeProvider as ThemeContextProvider } from '@/shared/context/ThemeContext';
import { setupAutoLogoutByExp } from '@/features/auth/utils/tokens';
import AppRouter from '@/app/router';

export default function App() {
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setupAutoLogoutByExp(token);
    }
  }, []);

  return (
    <ThemeContextProvider>
      <EmotionThemeProvider>
        <AppRouter />
      </EmotionThemeProvider>
    </ThemeContextProvider>
  );
}
