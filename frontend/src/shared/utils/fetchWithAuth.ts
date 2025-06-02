import {
  isAccessTokenStillValid,
  removeAccessToken,
  getAccessTokenPair,
} from '@/features/auth/utils/tokens';

export default async function fetchWithAuth(
  input: RequestInfo,
  init?: RequestInit,
) {
  const { token, tokenType } = getAccessTokenPair();

  if (!token || !isAccessTokenStillValid()) {
    removeAccessToken();
    window.location.href = '/login'; // 토큰 만료 시 강제 이동
    return Promise.reject(new Error('Token expired'));
  }

  const headers = {
    ...init?.headers,
    Authorization: token ? `${tokenType} ${token}` : '',
  };

  return fetch(input, {
    ...init,
    headers,
  });
}
