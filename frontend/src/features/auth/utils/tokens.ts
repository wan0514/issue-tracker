import { decodeAccessToken } from '@/shared/utils/decodeAccessToken';

export const TOKEN_KEY = 'access_token';
export const TOKEN_TYPE_KEY = 'token_type';

export function setAccessToken(token: string, tokenType: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_TYPE_KEY, tokenType);
}

export function getAccessTokenPair(): {
  token: string | null;
  tokenType: string | null;
} {
  return {
    token: localStorage.getItem(TOKEN_KEY),
    tokenType: localStorage.getItem(TOKEN_TYPE_KEY),
  };
}

export function removeAccessToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_TYPE_KEY);
}

export function isAccessTokenStillValid(): boolean {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return false;

  const decoded = decodeAccessToken(token);
  if (!decoded || !decoded.exp) return false;

  const now = Date.now();
  const expirationTime = decoded.exp * 1000;
  return now < expirationTime;
}

export function setupAutoLogoutByExp(token: string) {
  const decoded = decodeAccessToken(token);
  if (!decoded) return;

  const { exp } = decoded;
  const now = Date.now();
  const expirationTime = exp * 1000;
  const remaining = expirationTime - now;

  if (remaining <= 0) {
    removeAccessToken();
    window.location.href = '/login';
  } else {
    setTimeout(() => {
      removeAccessToken();
      window.location.href = '/login';
    }, remaining);
  }
}
