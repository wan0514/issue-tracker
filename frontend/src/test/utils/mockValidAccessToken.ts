import {
  TOKEN_KEY,
  TOKEN_TYPE_KEY,
  ISSUED_AT_KEY,
} from '@/features/auth/utils/tokens';

export default function mockValidAccessToken() {
  localStorage.setItem(TOKEN_KEY, 'mock-token');
  localStorage.setItem(TOKEN_TYPE_KEY, 'Bearer');
  localStorage.setItem(ISSUED_AT_KEY, Date.now().toString());
}
