const TOKEN_KEY = 'accessToken';
const TOKEN_TYPE_KEY = 'tokenType';
const ISSUED_AT_KEY = 'accessTokenIssuedAt';
const TOKEN_LIFETIME = 30 * 60 * 1000; // 30분(ms)

export function setAccessToken(token: string, tokenType: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_TYPE_KEY, tokenType);
  localStorage.setItem(ISSUED_AT_KEY, Date.now().toString());

  setupAutoLogout();
}

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeAccessToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_TYPE_KEY);
  localStorage.removeItem(ISSUED_AT_KEY);
}

export function isAccessTokenStillValid(): boolean {
  const issuedAt = localStorage.getItem(ISSUED_AT_KEY);
  if (!issuedAt) return false;

  const elapsed = Date.now() - parseInt(issuedAt, 10);
  return elapsed < TOKEN_LIFETIME;
}

export function setupAutoLogout() {
  const issuedAt = localStorage.getItem(ISSUED_AT_KEY);
  if (!issuedAt) return;

  const elapsed = Date.now() - parseInt(issuedAt, 10);
  const remaining = TOKEN_LIFETIME - elapsed;

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
